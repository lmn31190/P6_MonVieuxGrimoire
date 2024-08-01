import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const type = {
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
};


const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, "images");
  },


  filename: (req, file, callback) => {
    const name = file.originalname.replace(/[\s.]+/g, "_");
    const extension = type[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});


export const upload = multer({ storage: storage }).single("image");

// Resize img
export const resizeImage = (req, res, next) => {

  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `resized_${fileName}`);

  sharp(filePath)
    .resize({ width: 206, height: 260 })
    .toFile(outputFilePath)
    .then(() => {
      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

export default upload;
