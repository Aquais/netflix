import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      await prismadb.user.update({
        where: { email: currentUser.email || "" },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      res.status(200).end();
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      const updatedFavoritesIds = without(currentUser.favoriteIds, movieId);
      await prismadb.user.update({
        where: { email: currentUser.email || "" },
        data: {
          favoriteIds: updatedFavoritesIds,
        },
      });

      res.status(200).end();
    }
    res.status(405).end();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
