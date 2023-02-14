import { User } from "@prisma/client";
import { prismaInstance } from "..";

export default class UserController {
  static async get(id: string) {
    const user = await prismaInstance.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  static async create(data: Omit<User, "id">) {
    const user = await prismaInstance.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }
}