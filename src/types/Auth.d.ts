import { type User } from "@prisma/client";
import { type Request } from "express";

export type AuthRequestData = {
  userId: User["id"];
  token: string;
};

export type AuthToken = {
  userId: User["id"];
  email: User["email"];
  iat: number;
  exp: number;
};

export type AuthRequest = AuthRequestData & Request;
