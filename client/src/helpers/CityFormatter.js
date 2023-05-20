const CityFormatter = (city) => {
  return city
    .split(" ")
    .slice(1)
    .join(" ");
};

module.exports = CityFormatter;
