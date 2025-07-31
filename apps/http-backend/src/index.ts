import express from "express";
import jwt from "jsonwebtoken"
import { config } from './config';
import { middleware } from "./middleware";

const app = express()

app.listen(config.port)

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username,
        password
    })
    res.json({
        message: "user signed in"
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    const existingUser = await UserModel.findOne({
        username,
        password
        
    })
    if (existingUser) {
        const token = jwt.sign(
            {id: existingUser._id},
            config.jwtSecret
        );
    }
    
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