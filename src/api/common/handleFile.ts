import multer, { diskStorage as _diskStorage } from "multer";
import path from "path";

const diskStorage = _diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, path.join("/app/dist/public/"));
  },
  filename: async (req, file, callback) => {
    const math = ["application/pdf"];
    if (math.indexOf(file.mimetype) == -1) {
      const errorMess = new Error(
        `The file ${file.originalname} is invalid. Only allowed to upload pdf.`
      );
      return callback(errorMess, "");
    }
    console.log({ file });
    const filename = `${Date.now()}.${file.originalname}.pdf`;
    console.log(filename);
    callback(new Error(""), filename);
  },
});
export const uploadFile = multer({ storage: diskStorage }).single("file");
