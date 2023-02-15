import { UserWithTokens } from "./../types/User.d";
import { type User } from "@prisma/client";
import { prismaInstance } from "../..";

export default class UserModel {
  static async get(id: string, options = { includeToken: false }) {
    const user = await prismaInstance.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Token: options.includeToken,
      },
    });

    return user;
  }

  static async create(data: Omit<User, "id">): Promise<User> {
    const user = await prismaInstance.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }
}
