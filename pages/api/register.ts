import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400).json({ message: "Missing username or password" });
    return;
  }

  const existingUser = await prismadb.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    res.status(422).json({ message: "User already exists" }); 
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
