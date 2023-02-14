import { type AuthRequest } from "./../types/Auth.d";
import { prismaInstance } from "../..";
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

  static async logout(req: AuthRequest, res: Response) {
    const token = await prismaInstance.token.delete({
      where: {
        id: req.token,
      },
    });

    if (!token) {
      return res.send("Logout failed. No token found").status(404);
    }

    res.sendStatus(200);
  }
}
