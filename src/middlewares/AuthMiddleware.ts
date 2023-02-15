import { AuthRequestData, AuthToken } from "../types/Auth";
import { SECRET } from "../index";
import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

type MaybeAuthRequest = Partial<AuthRequestData> & Request;

export default async function AuthMiddleware(
  req: MaybeAuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const tokenData = jwt.verify(token, SECRET) as AuthToken;

    req.userId = tokenData.userId;
    req.token = token;

    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Unauthorized");
  }
}
