const TitleCaseFormatter = (text) => {
  return text !== undefined
    ? text
        .split(" ")
        .map((text) => text[0].toUpperCase() + text.slice(1).toLowerCase())
        .join(" ")
    : text;
};

module.exports = TitleCaseFormatter;
