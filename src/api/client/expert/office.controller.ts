import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createOffice,
  deleteOffice,
  detailOffice,
  getArea,
  getListOffice,
  recommendOffice,
  updateOffice,
} from "./office.service";
const router = express.Router();

// thong tin khu vuc cua minh
router.get("/area", authJwt.isExpert, async (req: Request, res: Response) => {
  getArea(req, res);
});

// list cac co so
router.get(
  "/offices",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    getListOffice(req, res);
  }
);

//tao 1 co so moi
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

// lay cac co so co nen duoc recommend
router.get(
  "/recommendOffice",
  authJwt.isExpert,
  async (req: Request, res: Response) => {
    recommendOffice(req, res);
  }
);

module.exports = router;
