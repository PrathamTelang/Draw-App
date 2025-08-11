import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }
  
  const urlParts = url.split('?');
  if (urlParts.length < 2) {
    ws.close();
    return;
  }
  
  const queryParams = new URLSearchParams(urlParts[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return;
  }

  const user: User = {
    userId,
    rooms: [],
    ws
  };

  users.push(user);
  console.log(`User ${userId} connected. Total users: ${users.length}`);

  ws.on('message', async function message(data) {
    try {
      let parsedData;
      if (typeof data !== "string") {
        parsedData = JSON.parse(data.toString());
      } else {
        parsedData = JSON.parse(data);
      }

      console.log("Message received:", parsedData);

      // Handle both "join_room" and "join_Room" for case insensitivity
      if (parsedData.type === "join_room" || parsedData.type === "join_Room") {
        const currentUser = users.find(x => x.ws === ws);
        if (currentUser && !currentUser.rooms.includes(parsedData.roomId)) {
          currentUser.rooms.push(parsedData.roomId);
          console.log(`User ${userId} joined room ${parsedData.roomId}`);
          console.log(`User ${userId} is now in rooms:`, currentUser.rooms);
        }
      }

      if (parsedData.type === "leave_room" || parsedData.type === "leave_Room") {
        const currentUser = users.find(x => x.ws === ws);
        if (currentUser) {
          // Filter OUT the room being left
          currentUser.rooms = currentUser.rooms.filter(x => x !== parsedData.roomId);
          console.log(`User ${userId} left room ${parsedData.roomId}`);
          console.log(`User ${userId} is now in rooms:`, currentUser.rooms);
        }
      }

      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        if (!roomId || !message) {
          console.log("Missing roomId or message");
          return;
        }

        // Find the current user sending the message
        const currentUser = users.find(x => x.ws === ws);
        console.log(`User ${userId} sending message to room ${roomId}`);
        console.log(`Current user rooms:`, currentUser?.rooms);
        console.log(`Total users in system:`, users.length);

        // Broadcast to all users in the room (including the sender)
        const usersInRoom = users.filter(user => user.rooms.includes(roomId));
        console.log(`Users in room ${roomId}:`, usersInRoom.map(u => u.userId));

        if (usersInRoom.length === 0) {
          console.log(`No users found in room ${roomId}. Make sure users joined the room first.`);
        }

        usersInRoom.forEach(user => {
          try {
            user.ws.send(JSON.stringify({
              type: "chat",
              message: message,
              roomId,
              userId,
              timestamp: new Date().toISOString()
            }));
            console.log(`Message sent to user ${user.userId}`);
          } catch (error) {
            console.error(`Error sending message to user ${user.userId}:`, error);
          }
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on('close', function close() {
    const userIndex = users.findIndex(x => x.ws === ws);
    if (userIndex !== -1) {
      const disconnectedUser = users[userIndex];
      if (disconnectedUser) {
        console.log(`User ${disconnectedUser.userId} disconnected`);
      }
      users.splice(userIndex, 1);
    }
    console.log(`Total users after disconnect: ${users.length}`);
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });
});

console.log('WebSocket server running on port 8080');
