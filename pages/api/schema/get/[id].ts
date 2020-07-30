import { NextApiRequest, NextApiResponse } from "next";
import { set, fakeSchema } from "../../../../shared/helpers";
import { fake } from "faker";
import * as _ from "lodash";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import uuid from "uuid";
import { cors } from "../../../../shared/lib/cors";

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ schemas: [], users: [] }).write();

const get = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const schema = db.get("schemas").find({ id }).value();

  if (schema) {
    res.json(fakeSchema(schema.body));
  } else {
    res.statusCode = 404;
    res.json({
      error: `Item with id '${id}' was not found`,
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
      console.log("POST");
      break;
    default:
      res.json({ message: "Unsupported method" });
  }
};
