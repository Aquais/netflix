import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    res.status(200).json(favoriteMovies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
