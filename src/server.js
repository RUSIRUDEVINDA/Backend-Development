import "dotenv/config"; // Must be first - loads env vars before any other imports
import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";

//import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
connectDB();
const app = express();

//body parser middleware
app.use(express.json());

//Api Routes
app.use("/movies", movieRoutes); 
app.use("/auth", authRoutes); 
app.use("/watchlist", watchlistRoutes);

const PORT = 5001;
const server = app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
});


// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});




//http:localhost:5001/movies/

//GET,POST,PUT,DELETE 
//patch for partial update for a example updating only the name of the user instead of whole user object

//AUTH - signup, signin
//MOVIE - GETING all movies
//user - profile
//watchlist - 