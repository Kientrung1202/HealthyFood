import multer, { diskStorage as _diskStorage } from "multer";
import path from "path";

const diskStorage = _diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join("/app/dist/public/"));
  },
  filename: async (req, file, callback) => {
    const officeId = req.body.officeId;
    const math = ["application/pdf"];
    if (math.indexOf(file.mimetype) === -1) {
      const errorMess = new Error(
        `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`
      );
      return callback(errorMess, "");
    }
    const filename = `${Date.now()}.${officeId}.pdf`;
    callback(null, filename);
  },
});
export const uploadFile = multer({ storage: diskStorage }).single("file");
