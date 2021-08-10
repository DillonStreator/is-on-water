const GeoJsonLookup = require("geojson-geometries-lookup");
const getMap = require("@geo-maps/earth-lands-1m");

const landLookup = new GeoJsonLookup(getMap());

module.exports = ({ lat, lng }) => {
  lat = parseFloat(lat)
  lng = parseFloat(lng)

  return {
    isOnWater: !landLookup.hasContainers({
      type: "Point",
      coordinates: [lng, lat],
    }),
    lat,
    lng,
  }
}
