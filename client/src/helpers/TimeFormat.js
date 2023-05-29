const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear().toString().slice(-4);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const formatTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear().toString().slice(-4);
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const readableDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const readableDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString(undefined, options);
};
module.exports = { formatDate, formatTime, readableDate, readableDateTime };
