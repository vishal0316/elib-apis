import express from "express";

const app = express();

//Routes
// HTTP METHODS GET , POST , DELETE , PUT , PATCH

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

export default app;
