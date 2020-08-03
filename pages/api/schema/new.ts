import { NextApiRequest, NextApiResponse } from "next";
import * as _ from "lodash";
import { cors } from "../../../shared/lib/cors";
import { connectToDatabase } from "../../../shared/db/connect";
import { flattenObject, createArray } from "../../../shared/helpers";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection("schemas");

  try {
    const { body, name } = JSON.parse(req.body);

    let record;

    // if (body.constructor === Array) {
    //   let arrRes = createArray(body).map(() => flattenObject(body[1]));
    //   record = arrRes;
    // } else {
    //   record = flattenObject(body);
    // }

    const data = {
      body,
      name: name,
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
