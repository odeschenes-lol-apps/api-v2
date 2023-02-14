import { type User } from "@prisma/client";
import { prismaInstance } from "../..";

export default class UserController {
  static async get(id: string): Promise<User | null> {
    const user = await prismaInstance.user.findUnique({
      where: {
        id: id,
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
