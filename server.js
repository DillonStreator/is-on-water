const express = require("express");
const cors = require("cors");
const isOnWater = require("./is-on-water");
const { isPoint } = require("./util");

const {
  MAX_UPLOAD_SIZE_IN_BYTES, // https://www.npmjs.com/package/bytes#bytesparsestring%EF%BD%9Cnumber-value-number%EF%BD%9Cnull
  MAX_BATCH_UPLOAD_NUMBER_OF_POINTS = 100,
} = process.env;

const app = express();

app.use(cors());
app.use(express.json({ limit: MAX_UPLOAD_SIZE_IN_BYTES }))

app.get("/", (_, res) => res.redirect("/status"));
app.get("/status", (_, res) => res.sendStatus(200));

const isOnWaterRouter = express
  .Router()
  .get("/", (req, res) => {
    if (!isPoint(req.query))
      return res
        .status(400)
        .send(
          "'lat' and 'lon' query parameters required representing a valid lat/lon (-180 < lat/lon < 180)"
        );
    const { lat, lon } = req.query;

    res.json(isOnWater({ lat, lon }));
  })
  .post("/", (req, res) => {
    const points = req.body;
    if (!Array.isArray(points))
      return res.status(400).send("body must be an array of points");

    if (points.length > MAX_BATCH_UPLOAD_NUMBER_OF_POINTS)
      return res
        .status(400)
        .send(
          `the max number of points allowed is ${MAX_BATCH_UPLOAD_NUMBER_OF_POINTS}. You provided ${points.length}.`
        );

    if (!points.every(isPoint))
      return res
        .status(400)
        .send(
          "'points' is a required field that must be an array of objects containing keys 'lat' and 'lon' representing a valid lat/lon (-180 < lat/lon < 180)"
        );

    res.json(points.map(isOnWater));
  });

app.use("/is-on-water", isOnWaterRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
