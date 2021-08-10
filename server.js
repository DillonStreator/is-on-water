const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const isOnWater = require("./is-on-water");
const { hasPoint } = require("./util");

const app = express();

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (_, res) => res.redirect("/status"));
app.get("/status", (_, res) => res.sendStatus(200));

const isOnWaterRouter = express
  .Router()
  .get("/", (req, res) => {
    if (!hasPoint(req.query))
      return res
        .status(400)
        .send(
          "'lat' and 'lng' query parameters required representing a valid lat/lng (-180 < lat/lng < 180)"
        );
    const { lat, lng } = req.query;

    res.json(isOnWater({ lat, lng }));
  })
  .post("/", (req, res) => {
    const { points } = req.body;
    if (!Array.isArray(points) || !points.every(hasPoint))
      return res
        .status(400)
        .send(
          "'points' is a required field that must be an array of objects containing keys 'lat' and 'lng' representing a valid lat/lng (-180 < lat/lng < 180)"
        );

    res.json(points.map(isOnWater));
  });

app.use("/is-on-water", isOnWaterRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
