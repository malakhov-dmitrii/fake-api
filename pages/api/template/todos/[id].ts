import { NextApiRequest, NextApiResponse } from "next";
import { composeTodo } from "../../../../shared/helpers";
import { cors } from "../../../../shared/lib/cors";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const todo = composeTodo(Number(req.query.id));
  res.json(todo);
};
