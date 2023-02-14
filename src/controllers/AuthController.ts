import { prismaInstance } from "..";
import { type Request, type Response } from "express";
import UserModel from "../models/UserModel";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserModel.get(id);

      res.send(user);
    } catch (e) {
      console.error(e);
      res.status(404).send("User not found");
    }
  }

  static async logout(req: Request, res: Response) {
    const { id } = req.params;

    // how to get token from header
  }
}
