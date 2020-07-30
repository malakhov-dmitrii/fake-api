import { NextApiRequest, NextApiResponse } from "next";
import { set, fakeSchema } from "../../../shared/helpers";
import { fake } from "faker";
import * as _ from "lodash";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { v4 as uuidv4 } from "uuid";

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ schemas: [], users: [] }).write();

const post = (req: NextApiRequest, res: NextApiResponse) => {
  // Add a schema
  const id = uuidv4();
  db.get("schemas").push({ id, body: req.body, user: null }).write();

  res.json({ id });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
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
