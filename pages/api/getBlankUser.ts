import { NextApiRequest, NextApiResponse } from "next";
import { getDummyUser, runModifier, User } from "../../prisma/modifiers";

export default async function getBlankUser(req: NextApiRequest, res: NextApiResponse<User | null>) {
  const blankUser = await runModifier(() => getDummyUser());
  console.log("here", blankUser);
  res.status(200).json(blankUser);
}
