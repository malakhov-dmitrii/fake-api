import { NextApiRequest, NextApiResponse } from "next";
import { composeUser } from "./[id]";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Generate users array with 100 length default
  const users = Array.from({ length: 100 }).map((_, id) => composeUser(id));
  res.json(users);
};
