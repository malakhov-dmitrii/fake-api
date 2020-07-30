import { NextApiRequest, NextApiResponse } from "next";
import { fakeSchema, flattenObject } from "../../../shared/helpers";
import * as _ from "lodash";
import { cors } from "../../../shared/lib/cors";

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const r = fakeSchema(flattenObject(JSON.parse(req.body)));

  res.json(r);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  res.statusCode = 200;
  const METHOD = req.method;

  switch (METHOD) {
    case "POST":
      post(req, res);
      break;
    default:
      res.json({ message: "Unsupported method" });
  }
};
