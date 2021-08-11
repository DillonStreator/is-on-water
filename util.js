const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

// in order to be a point, the object must contain a `lat` and `lon` property that are valid latitude and longitude values
const isPoint = (obj) => {
  if (!(typeof obj === "object")) return false;

  const { lat, lon } = obj;
  if (!lat || !lon) return false;

  if (!isNumber(lat) || !isNumber(lon)) return false;

  const latF = parseFloat(lat);
  const lonF = parseFloat(lon);
  return latF <= 180 && latF >= -180 && lonF <= 180 && lonF >= -180;
};

module.exports = {
  isPoint,
};
