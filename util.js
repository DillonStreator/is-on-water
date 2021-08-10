const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const hasPoint = (obj) => {
  if (!(typeof obj === "object")) return false;

  const { lat, lng } = obj;
  if (!lat || !lng) return false;

  if (!isNumber(lat) || !isNumber(lng)) return false;

  const latF = parseFloat(lat);
  const lngF = parseFloat(lng);
  return latF <= 180 && latF >= -180 && lngF <= 180 && lngF >= -180;
};

module.exports = {
  hasPoint,
};
