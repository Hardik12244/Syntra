import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "syntra_uploads",
      resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
    };
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  
  if (isImage || isVideo) {
    const size = parseInt(req.headers["content-length"] || "0");
    if (isImage && size > 5 * 1024 * 1024) {
      return cb(new Error("Image size must be less than 5MB"), false);
    }
    if (isVideo && size > 15 * 1024 * 1024) {
      return cb(new Error("Video size must be less than 15MB"), false);
    }
    cb(null, true);
  } else {
    cb(new Error("Only images and videos allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});