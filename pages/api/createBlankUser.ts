import { NextApiRequest, NextApiResponse } from "next";
import { createDummyUser, runModifier, User } from "../../prisma/modifiers";

export default async function createBlankUser(req: NextApiRequest, res: NextApiResponse<User>) {
  await runModifier(() => createDummyUser());
  res.status(200);
}
