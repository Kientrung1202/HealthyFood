import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import { getArea, getListCity, updateAreaForExpert } from "./api1.service";
import { getListExpert } from "../admin/editUser.service";

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

router.put(
  "/manage/expert",
  authJwt.isManage,
  (req: Request, res: Response) => {
    updateAreaForExpert(req, res);
  }
);

router.get(
  "/manage/experts",
  authJwt.isManage,
  (req: Request, res: Response) => {
    getListExpert(req, res);
  }
);
module.exports = router; // export all router
