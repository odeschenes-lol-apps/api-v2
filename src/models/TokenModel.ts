import jwt from "jsonwebtoken";
import { UserWithTokens } from "./../types/User.d";
import { Token, type User } from "@prisma/client";
import { prismaInstance, SECRET } from "../..";

export default class TokenModel {
  static async get(id: string, options = { includeUser: false }) {
    const token = await prismaInstance.token.findUnique({
      where: {
        id: id,
      },
      include: {
        user: options.includeUser,
      },
    });

    return token;
  }

  static async create(user: User): Promise<Token> {
    const jwtToken = jwt.sign({ userId: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    const newToken = await prismaInstance.token.create({
      data: {
        token: jwtToken,
        userId: user.id,
      },
    });

    return newToken;
  }
}
