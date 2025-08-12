import express from "express";
import jwt from "jsonwebtoken"
import {config} from "@repo/backend-common/config"
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express()
app.use(express.json())

app.listen(config.httpport)

app.post("/api/v1/signup", async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid input"
        });
        return;
    }

    try {
        const user = await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
            photo: ""
        }
    })
    res.json({
        userId: user.id,
    })

    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }

    if (!parsedData.data.username || !parsedData.data.password || !parsedData.data.name) {
        res.status(400).json({
            message: "User information is incomplete"
        });
        return;
    }

    

    res.json({
        message: "user signed up"
    })
})

app.post("/api/v1/signin", async (req, res) => {

       const parsedData = SignInSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid input"
        });
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    if (!user) {
        res.status(401).json({
            message: "Invalid username or password"
        });
        return;
    }
    const token = jwt.sign({
        userId: user?.id
    }, config.jwtSecret)
    
    res.json({
        message: "User signed in"
        , token: token,
    })
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid input"
        });
        return;
    }
    //@ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
        data: {
            slug: parsedData.data.name,
            adminId: userId,
        }
    })
    res.json({
        roomId: room.id,
    })
    
    } catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }

    
})

app.get("/chats/:roomId", async (req, res ) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
    res.json({
        messages
    })
})