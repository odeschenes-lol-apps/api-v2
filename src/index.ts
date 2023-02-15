import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/AuthMiddleware";
import UserModel from "./models/UserModel";
import TokenModel from "./models/TokenModel";

export const prismaInstance = new PrismaClient();
const app = express();

export const SECRET = process.env.TOKEN_SECRET || "secret";

app.get("/", async (req, res) => {
  console.log("hello");

  const user = await UserModel.create({
    email: String(Math.random()).replace(".", "") + "@test.com",
  });

  const token = await TokenModel.create(user);

  const verify = jwt.verify(token.token, SECRET);

  const userAgent = req.headers["user-agent"];

  res.send({ user, token, userAgent, verify });
});

app.get("/restricted", authMiddleware, async (req, res) => {
  res.send("Restricted");
});

const server = app.listen(3000);
