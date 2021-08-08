const express = require("express");
const cors = require("cors");
const isOnWater = require("./is-on-water");

const app = express();

app.use(cors());

app.get("/", (_, res) => res.redirect("/status"));
app.get("/status", (_, res) => res.sendStatus(200));

app.get("/is-on-water", (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).send("'lat' and 'lng' query parameters required");

  res.json({ isOnWater: isOnWater({ lat, lng }) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
