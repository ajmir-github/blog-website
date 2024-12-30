import multer from "multer";
import { v4 } from "uuid";
import path from "path";
import fs from "fs";

export const deleteImage = async (name: string) => {
  try {
    await fs.promises.rm(path.join("./public/images/", name));
  } catch (error: any) {
    console.error(error.message);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },

  filename: function (req, file, cb) {
    // generate a unique name for the image
    const ext = path.extname(file.originalname);
    const uniqueName = v4();
    const fileName = uniqueName + ext;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

export const profileUploader = upload.single("profile");
export const imagesUploader = upload.array("images", 8);
