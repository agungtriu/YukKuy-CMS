const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const deleteFile = async (data) => {
  if (
    data !== null &&
    data !== "image_default.png" &&
    data !== "avatar_default.png"
  ) {
    const filePath = `./public/images/${data}`;
    await unlinkAsync(filePath);
  }
};

module.exports = deleteFile;