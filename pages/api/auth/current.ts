import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { currentUser } = await serverAuth(req);
    res.status(200).json(currentUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
