import { NextApiRequest, NextApiResponse } from "next";
import { composeUser } from "./[id]";
import { cors } from "../../../../shared/lib/cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  // Generate users array with 100 length default
  const users = Array.from({ length: 100 }).map((_, id) => composeUser(id));
  res.json(users);
};
