const GeoJsonLookup = require("geojson-geometries-lookup");
const getMap = require("@geo-maps/earth-lands-1m");

const waterLookup = new GeoJsonLookup(getMap());

module.exports = ({ lat, lng }) =>
  !waterLookup.hasContainers({ type: "Point", coordinates: [lng, lat] });
