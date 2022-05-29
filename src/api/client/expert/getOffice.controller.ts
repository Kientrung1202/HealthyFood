import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createOffice,
  detailOffice,
  getLinkDoc,
  getListOffice,
} from "./getOffice.service";
import path from "path";
const router = express.Router();

router.get(
  "/listOffice",
  authJwt.isUser,
  async (req: Request, res: Response) => {
    getListOffice(req, res);
  }
);
router.post("/office", authJwt.isUser, async (req: Request, res: Response) => {
  // create office
  createOffice(req, res);
});

router.get(
  "/office/:officeId",
  authJwt.isUser,
  async (req: Request, res: Response) => {
    detailOffice(req, res);
  }
);

router.get(
  "/file/:officeId",
  authJwt.isUser,
  async (req: Request, res: Response) => {
    getLinkDoc(req, res);
  }
);

// router.get("/test", async (req: Request, res: Response) => {
//   return res.sendFile(path.join(`/app/dist/public/1.pdf`));
// });

module.exports = router;
