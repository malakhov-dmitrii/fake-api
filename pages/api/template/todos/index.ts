import { composeTodo } from "../../../../shared/helpers";
import { NextApiRequest, NextApiResponse } from "next";
const _ = require("lodash");

const sendError = (res, message = "something went wrong") => {
  res.status(500).json({
    error: message,
  });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      id,
      limit = 100,
      title,
      completed,
      userId,
      sort = "asc",
      sortBy = "id",
    } = req.query;
    if (["desc", "asc"].indexOf(sort) === -1) {
      sendError(res, "'sort' param is incorrect");
    }
    if (["id", "userId", "completed", "title"].indexOf(sortBy) === -1) {
      sendError(res, "'sortBy' param is incorrect");
    }
    if ((id && isNaN(Number(id))) || (userId && isNaN(Number(userId)))) {
      sendError(res, "'id'`s should be a number");
    }
    if (Number(limit) > 1000 || (limit && isNaN(Number(limit)))) {
      sendError(res, "'limit' should be a number & <= 1000");
    } else {
      const emptyArr = Array.from({ length: Number(limit) });
      const todos = emptyArr.map((_, arrId) =>
        composeTodo(arrId, Number(id), Number(userId), completed, title)
      );

      const response = _.orderBy(todos, sortBy, sort);
      res.json(response);
    }
  }
};
