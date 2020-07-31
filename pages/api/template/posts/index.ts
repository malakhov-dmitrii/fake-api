import { NextApiRequest, NextApiResponse } from "next";
import { cors } from "../../../../shared/lib/cors";
import { composePost } from "../../../../shared/helpers";
const _ = require("lodash");

const sendError = (res, message = "something went wrong") => {
  res.status(500).json({
    error: message,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

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
    // @ts-ignore
    if (["desc", "asc"].indexOf(sort) === -1) {
      sendError(res, "'sort' param is incorrect");
    }
    // @ts-ignore
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
      const posts = emptyArr.map((_, arrId) =>
        // @ts-ignore
        composePost(arrId, Number(id), Number(userId), completed, title)
      );

      const response = _.orderBy(posts, sortBy, sort);
      res.json(response);
    }
  }
};
