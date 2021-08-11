const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const isOnWater = require("./is-on-water");
const { isPoint } = require("./util");

const {
  MAX_BATCH_UPLOAD_SIZE_IN_BYTES, // https://www.npmjs.com/package/bytes#bytesparsestring%EF%BD%9Cnumber-value-number%EF%BD%9Cnull
  MAX_BATCH_UPLOAD_NUMBER = 100,
} = process.env;

const app = express();

app.use(cors());
const bpShared = {
  limit: MAX_BATCH_UPLOAD_SIZE_IN_BYTES,
};
app.use(bp.json(bpShared));
app.use(bp.urlencoded({ ...bpShared, extended: true }));

app.get("/", (_, res) => res.redirect("/status"));
app.get("/status", (_, res) => res.sendStatus(200));

const isOnWaterRouter = express
  .Router()
  .get("/", (req, res) => {
    if (!isPoint(req.query))
      return res
        .status(400)
        .send(
          "'lat' and 'lng' query parameters required representing a valid lat/lng (-180 < lat/lng < 180)"
        );
    const { lat, lng } = req.query;

    res.json(isOnWater({ lat, lng }));
  })
  .post("/", (req, res) => {
    const points = req.body;
    if (!Array.isArray(points))
      return res.status(400).send("body must be an array of points");

    if (points.length > MAX_BATCH_UPLOAD_NUMBER)
      return res
        .status(400)
        .send(
          `the max number of points allow is ${MAX_BATCH_UPLOAD_NUMBER}. You provided ${points.length}.`
        );

    if (!points.every(isPoint))
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
