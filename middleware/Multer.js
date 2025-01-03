import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./CloudinaryImage.js";
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "linkedin-Images", 
      format: async () => "png", // Supports: jpg, png, etc.
      public_id: (req, file) => file.originalname.split(".")[0], 
    },
  });  
  const upload = multer({ storage });
  export default upload;