import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createCer,
  createOffice,
  deleteOffice,
  detailOffice,
  getArea,
  getEvict,
  getFile,
  getListCer,
  getListOffice,
  updateFileCer,
  updateOffice,
} from "./getOffice.service";
import { uploadFile } from "../../common/handleFile";
const router = express.Router();

router.get("/area", authJwt.isExpert, async (req: Request, res: Response) => {
  getArea(req, res);
});

router.get(
  "/offices",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    getListOffice(req, res);
  }
);
router.post(
  "/office",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    // create office
    createOffice(req, res);
  }
);

router.get(
  "/office/:officeId",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    detailOffice(req, res);
  }
);

router.put(
  "/office/:officeId",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    updateOffice(req, res);
  }
);

router.delete(
  "/office/:officeId",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    deleteOffice(req, res);
  }
);
router.post(
  "/certification",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    createCer(req, res);
  }
);

// upload file dang loi
router.put(
  "/certification",
  [authJwt.isExpert, uploadFile],
  async (req: Request, res: Response) => {
    // updateFileCer(req, res);
    res.json("upload oke");
  }
);
router.get("/cers", authJwt.isExpert, async (req: Request, res: Response) => {
  getListCer(req, res);
});

router.get("/evict", authJwt.isExpert, async (req: Request, res: Response) => {
  getEvict(req, res);
});
router.get("/file", authJwt.isExpert, async (req: Request, res: Response) => {
  getFile(req, res);
});

module.exports = router;
