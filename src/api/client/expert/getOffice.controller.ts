import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createOffice,
  deleteOffice,
  detailOffice,
  getEvict,
  getFile,
  getListCer,
  getListOffice,
  updateOffice,
} from "./getOffice.service";
const router = express.Router();

router.get("/offices", authJwt.isUser, async (req: Request, res: Response) => {
  getListOffice(req, res);
});
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

router.put(
  "/office/:officeId",
  authJwt.isUser,
  async (req: Request, res: Response) => {
    updateOffice(req, res);
  }
);

router.delete(
  "/office/:officeId",
  authJwt.isUser,
  async (req: Request, res: Response) => {
    deleteOffice(req, res);
  }
);

router.get("/cers", authJwt.isUser, async (req: Request, res: Response) => {
  getListCer(req, res);
});

router.get("/evict", authJwt.isUser, async (req: Request, res: Response) => {
  getEvict(req, res);
});
router.get("/file", authJwt.isUser, async (req: Request, res: Response) => {
  getFile(req, res);
});

module.exports = router;
