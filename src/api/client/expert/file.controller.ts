import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createCer,
  createEvict,
  getEvict,
  getFile,
  getListCer,
  postFilePdf,
} from "./file.service";
const router = express.Router();

// post file pdf: cer, evict
router.post(
  "/filePdf",
  [authJwt.isExpert],
  async (req: Request, res: Response) => {
    postFilePdf(req, res);
  }
);

// lay ra de tai
router.get("/file/:name", async (req: Request, res: Response) => {
  getFile(req, res);
});
// lay cac certifications cua co so
router.get(
  "/certifications",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    getListCer(req, res);
  }
);
// tao 1 certification cua co so
router.post(
  "/certification",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    createCer(req, res);
  }
);

// nhan quyet dinh thu hoi certificationId
router.get("/evict", authJwt.isExpert, async (req: Request, res: Response) => {
  getEvict(req, res);
});
// quyet dinh thu hoi 1 chung chi
router.post("/evict", authJwt.isExpert, async (req: Request, res: Response) => {
  createEvict(req, res);
});

module.exports = router;
