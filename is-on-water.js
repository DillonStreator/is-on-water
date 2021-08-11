const GeoJsonLookup = require("geojson-geometries-lookup");
const getMap = require("@geo-maps/earth-lands-1m");

const landLookup = new GeoJsonLookup(getMap());

module.exports = ({ lat, lon }) => {
  lat = parseFloat(lat)
  lon = parseFloat(lon)

  return {
    water: !landLookup.hasContainers({
      type: "Point",
      coordinates: [lon, lat],
    }),
    lat,
    lon,
  }
}
