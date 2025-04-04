export default async function handler(req, res) {
  await client.connect();
  const db = client.db("tracking");
  const projects = await db.collection("statuses").find().sort({ timestamp: -1 }).toArray();
  res.json(projects);
}
