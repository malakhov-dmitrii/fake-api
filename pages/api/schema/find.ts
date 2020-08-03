import { NextApiRequest, NextApiResponse } from "next";
import {
  fakeSchema,
  createArray,
  flattenObject,
} from "../../../shared/helpers";
import * as _ from "lodash";

import { cors } from "../../../shared/lib/cors";
import { connectToDatabase } from "../../../shared/db/connect";
import { ObjectId } from "mongodb";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nameOrId } = req.query;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection("schemas");
  console.log({ nameOrId, typeof: typeof nameOrId });

  try {
    const schema = await collection.findOne({
      name: nameOrId,
    });

    if (schema) {
      console.log(schema);
      res.json({ schema });
    } else {
      res.statusCode = 404;
      res.json({
        error: `Item with name or id '${nameOrId}' was not found`,
      });
    }
  } catch (error) {
    res.json({
      error: `Item with name or id '${nameOrId}' was not found`,
    });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  res.statusCode = 200;
  const METHOD = req.method;

  switch (METHOD) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      break;
    default:
      res.json({ message: "Unsupported method" });
  }
};
