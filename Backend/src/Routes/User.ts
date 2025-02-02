import { Router } from "express";
import { string, z } from "zod";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const userRouter = Router();

const signupBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

userRouter.post("/signup", async (req, res) => {
    const { success, data, error } = signupBody.safeParse(req.body);

    if(!success) {
        res.status(422).json({
            message: "Invalid Input",
            details: error.errors
        })
    }

    const user = await prisma.user.findUnique({
        where: { name:data?.name },
    })

    if (user) {
        res.status(409).json({
            message: "User already exists"
        });
    }
    // @ts-ignore
    const hashedPassword = await bcrypt.hash(data?.password, 10);

    const newUser = await prisma.user.create({
        data:{
            name: data?.name || "",
            email: data?.email || "",
            password: hashedPassword || ""
        },
    });

    const token = jwt.sign({
        userId: newUser.id
    }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        token: token,
    });
})

userRouter.post("/signin", (req, res) => {

})

userRouter.get("/purchases", (req, res) => {

})

export { userRouter };