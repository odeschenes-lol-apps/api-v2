import { prismaInstance } from "../..";
import { type Request, type Response } from "express";
import UserModel from "../models/UserModel";
import { User } from "@prisma/client";

export default class UserController {
  static async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserModel.get(id);

      res.send(user);
    } catch (e) {
      console.error(e);
      res.status(404).send("User not found");
    }
  }

  static async createUser(req: Request, res: Response) {
    const { email } = req.params as Omit<User, "id">;

    try {
      const user = await UserModel.create({ email });

      res.send(user);
    } catch (e) {
      console.error(e);
      res.status(500).send("User not created");
    }
  }
}
