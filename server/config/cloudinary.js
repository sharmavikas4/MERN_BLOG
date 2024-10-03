import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import { runInNewContext } from "vm";
import exp from "constants";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "CloudinaryDemo",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});
const upload = multer({ storage });

export default upload;
