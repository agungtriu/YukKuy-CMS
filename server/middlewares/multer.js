const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        Math.floor(Math.random() * 100) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
