import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { project_id, survey_id, status } = req.body;
  if (!project_id || !survey_id || !status) return res.status(400).json({ error: "Missing fields" });

  await client.connect();
  const db = client.db("tracking");
  const collection = db.collection("statuses");

  await collection.insertOne({ project_id, survey_id, status, timestamp: new Date() });

  res.json({ message: "Status Updated" });
}
