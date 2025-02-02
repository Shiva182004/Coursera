import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./Routes/User";
import { adminRouter } from "./Routes/Admin";
import { courseRouter } from "./Routes/Course";

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

app.listen(3000);