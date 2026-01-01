import express from "express";

const router = express.Router();

router.get("/", (req, res) => { // endpoint: /movies/
  res.json({ httpMethod: "get" });
});

router.post("/", (req, res) => {
  res.json({ httpMethod: "post" });
});

router.put("/", (req, res) => {
  res.json({ httpMethod: "put" });
});

router.delete("/", (req, res) => {
  res.json({ httpMethod: "delete" });
});

export default router;