import express from "express";
import jwt from "jsonwebtoken"
import {config} from "@repo/backend-common/config"
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types";

const app = express()

app.listen(config.httpport)

app.post("/api/v1/signup", async (req, res) => {
    
    const data = CreateUserSchema.safeParse(req.body)
    if (!data.success) {
        res.status(400).json({
            message: "Invalid input"
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