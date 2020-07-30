import { NextApiRequest, NextApiResponse } from "next";
import { composeTodo } from "../../../../shared/helpers";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const todo = composeTodo(Number(req.query.id));
  res.json(todo);
};
