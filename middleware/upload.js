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


// Filtrer les fichiers en fonction de leur type MIME
const fileFilter = (req, file, callback) => {
  if (type[file.mimetype]) {
    // Si le type de fichier est valide, accepter le fichier
    callback(null, true);
  } else {
    // Si le type de fichier est invalide, rejeter le fichier
    callback(new Error("Invalid file type. Only JPG, PNG, and WEBP files are allowed."), false);
  }
};

// Middleware multer avec filtre de fichier
export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter // Ajout du filtre de fichier
}).single("image");

// Resize img
export const resizeImage = (req, res, next) => {

  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `optimized_${fileName}`);

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
