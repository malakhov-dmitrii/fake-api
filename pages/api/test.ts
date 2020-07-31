import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../shared/db/connect";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  console.log(process.env.MONGODB_URI);

  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Select the "users" collection from the database
  const collection = await db.collection("schemas");

  // Select the users collection from the database
  const schemas = await collection.find().toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ schemas });
};
