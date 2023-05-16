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

module.exports = { formatDate, formatTime };
