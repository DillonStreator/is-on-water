const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

// in order to be a point, the object must contain a `lat` and `lng` property that are valid latitude and longitude values
const isPoint = (obj) => {
  if (!(typeof obj === "object")) return false;

  const { lat, lng } = obj;
  if (!lat || !lng) return false;

  if (!isNumber(lat) || !isNumber(lng)) return false;

  const latF = parseFloat(lat);
  const lngF = parseFloat(lng);
  return latF <= 180 && latF >= -180 && lngF <= 180 && lngF >= -180;
};

module.exports = {
  isPoint,
};
