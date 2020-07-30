import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const todo = composeTodo(Number(req.params.id));
  res.json(todo);
};
