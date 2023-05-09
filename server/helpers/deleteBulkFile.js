const deleteFile = require("./deleteFile");

const deleteBulkFile = (datas) => {
  datas.forEach((data) => {
    deleteFile(data.dataValues.src);
  });
};

module.exports = deleteBulkFile;
