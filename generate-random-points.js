const fs = require("fs")
const path = require("path")
const faker = require("faker")

const NUM_POINTS = 100;

const points = new Array(NUM_POINTS).fill().map(() => ({
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
}))

fs.writeFileSync(path.join(__dirname, "random-points.json"), JSON.stringify(points, undefined, 2))