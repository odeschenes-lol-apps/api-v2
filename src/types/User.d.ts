import { Prisma, User } from "@prisma/client";
export type UserWithTokens = Prisma.UserGetPayload<{
  include: {
    Token: true;
  };
}>;
