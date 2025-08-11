import { WebSocketServer, WebSocket } from "ws";
import {config} from "@repo/backend-common/config"
import jwt, { JwtPayload } from "jsonwebtoken"


const wss = new WebSocketServer({ port:config.wsport });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}
const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, config.jwtSecret)

        if (typeof decoded === 'string') {
            return null;
        }

        if (!decoded || !decoded.userId) {
            return null;
        }

        return decoded.userId
    } catch(e) {
        return null;
    }
}

wss.on('connection', function connection(ws, request) {

    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if(userId == null) {
        ws.close()
        return
    }

    users.push({
        userId,
        rooms: [],
        ws
    })



    ws.on('message', function message(data) {
        const parsedData = JSON.parse(data as unknown as string);

        if (parsedData.type === 'join_Room') {
            const user = users.find(x => x.ws ===ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === 'leave_Room') {
            const user = users.find(x => x.ws ===ws);
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room);
        }

        if (parsedData.type == "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        roomId,
                        message
                    }));
                }
            });

        }

    })
})