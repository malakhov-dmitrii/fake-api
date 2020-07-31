import { NextApiRequest, NextApiResponse } from "next";
import * as _ from "lodash";
import { cors } from "../../../shared/lib/cors";
import { connectToDatabase } from "../../../shared/db/connect";
import { flattenObject } from "../../../shared/helpers";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection("schemas");

  try {
    const body = JSON.parse(req.body);
    const data = {
      body: flattenObject(body.body),
      name: body.name,
      user: null,
    };

    const r = await collection.insertOne(data);

    res.json({ id: r.insertedId });
  } catch (error) {
    res.json({ error: "Error occurred" });
  }
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
