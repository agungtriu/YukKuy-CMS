const TitleCaseFormatter = (text) => {
  return text !== undefined
    ? text
        .split(" ")
        .map((text) =>
          text[0] !== "" && text[0] !== null && text[0] !== undefined
            ? text[0].toUpperCase() + text.slice(1).toLowerCase()
            : null
        )
        .join(" ")
    : text;
};

module.exports = TitleCaseFormatter;
