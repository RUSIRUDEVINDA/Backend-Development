import { prisma } from "../config/db.js";

const addToWatchList = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { userId, movieId, status, rating, notes } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({
        error: "userId and movieId are required"
      });
    }

    // verify movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // check if already added
    const existingWatchlistItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId
        }
      }
    });

    if (existingWatchlistItem) {
      return res.status(400).json({ error: "Movie already in watchlist" });
    }

    const newWatchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes
      }
    });

    return res.status(201).json({
      status: "success",
      data: newWatchlistItem
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

export { addToWatchList };
