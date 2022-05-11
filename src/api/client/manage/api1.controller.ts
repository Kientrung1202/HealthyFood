import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import { getArea, getListCity } from "./api1.service";

const router = express.Router();

router.get(
  "/manage/listCity",
  authJwt.isManage,
  (req: Request, res: Response) => {
    getListCity(req, res);
  }
);
router.get(
  "/manage/listArea",
  authJwt.isManage,
  (req: Request, res: Response) => {
    getArea(req, res);
  }
);
module.exports = router; // export all router
