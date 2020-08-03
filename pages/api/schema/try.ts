import { NextApiRequest, NextApiResponse } from "next";
import {
  fakeSchema,
  flattenObject,
  createArray,
} from "../../../shared/helpers";
import * as _ from "lodash";
import { cors } from "../../../shared/lib/cors";

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const flatBody = flattenObject(body);
  // console.log(flatBody);
  let response;
  if (body.constructor === Array) {
    let arrayRes = createArray(body).map(() => {
      return fakeSchema(flattenObject(body[1]));
    });
    response = arrayRes;
  } else {
    response = fakeSchema(flatBody);
  }
  res.json(response);
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
