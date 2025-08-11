import express from "express";
import jwt from "jsonwebtoken"
import {config} from "@repo/backend-common/config"
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express()
app.use(express.json())

app.listen(config.httpport)

app.post("/api/v1/signup", async (req, res) => {
    
    const data = CreateUserSchema.safeParse(req.body)
    if (!data.success) {
        res.status(400).json({
            message: "Invalid input"
        });
        return;
    }

    try {
        await prismaClient.user.create({
        data: {
            email: data.data.username,
            password: data.data.password,
            name: data.data.name,
            photo: ""
        }
    })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
    
    if (!data.data.username || !data.data.password || !data.data.name) {
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

    
    res.json({
        message: "User signed in"
    })
})

app.post("/room", middleware, (req, res) => {
    // db call

    res.json({
        roomId: 123
    })
})