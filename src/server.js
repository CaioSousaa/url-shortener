const express = require("express");
const shortid = require("shortid");

const app = express();

const urls = {};

app.use(express.json());

app.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "the URL is necessary" });
  }

  const id = shortid.generate();
  urls[id] = url;

  res.status(201).json({ shortUrl: `http://localhost:3000/${id}` });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const originalUrl = urls[id];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "URL not found!!!" });
  }
});

app.listen(3000, () => {
  console.log("Server is run");
});
