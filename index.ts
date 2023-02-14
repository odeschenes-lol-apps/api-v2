import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import authMiddleware from "./src/middlewares/AuthMiddleware";

export const prismaInstance = new PrismaClient();
const app = express();

export const SECRET = process.env.TOKEN_SECRET || "secret";

app.get("/", async (req, res) => {
  console.log("hello");

  const user = await prismaInstance.user.create({
    data: {
      email: Math.random() + "@test.com",
    },
  });

  const jwtToken = jwt.sign({ userId: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });

  const token = await prismaInstance.token.create({
    data: {
      userId: user.id,
      token: jwtToken,
    },
  });

  const verify = jwt.verify(token.token, SECRET);

  res.send({ user, token, verify });
});

app.get("/restricted", authMiddleware, async (req, res) => {
  res.send("Restricted");
});

const server = app.listen(3000);
