import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Configure storage with file filter
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "CloudinaryDemo",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

// Modified multer config to make image optional
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Accept file if it exists and matches allowed formats
    if (file) {
      if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    } else {
      // Accept request even if no file is present
      cb(null, true);
    }
  }
}).single("image");

export { upload };

