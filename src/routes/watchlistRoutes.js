import express from "express";
import {addToWatchList} from "../controllers/watchlistController.js";


const router = express.Router();

//router.use(authMiddleware);

router.post("/", addToWatchList);
// {{baseUrl}}/watchlist/:id
//router.put("/:id", updateWatchlistItem);

// {{baseUrl}}/watchlist/:id
//router.delete("/:id", removeFromWatchlist);

export default router;