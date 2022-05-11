import { Request, Response } from "express";
import "dotenv/config";
import {
  createExpert,
  createManage,
  deleteUser,
  getListExpert,
  getListMange,
} from "./editUser.service";
import { success } from "../../../utils/response";
import CommonError from "../../common/error";
import { authenticate } from "../../middleware/authenticate";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
const router = express.Router();

router.post(
  "/admin/createExpert",
  // check xem account da co chua, check xem la admin ko
  [authJwt.isAdmin, authenticate.checkSignup],
  (req: Request, res: Response) => {
    createManage(req)
      .then(() => {
        return res.json(success("Create a expert successfully!"));
      })
      .catch((err: Error) => {
        return CommonError(req, res, err);
      });
  }
);

router.post(
  "/admin/createManage",
  [authenticate.checkSignup, authJwt.isAdmin],
  (req: Request, res: Response) => {
    createExpert(req)
      .then(() => {
        return res.json(success("Create a manage successfully!"));
      })
      .catch((err: Error) => {
        return CommonError(req, res, err);
      });
  }
);
router.get(
  "/admin/listManage",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    getListMange(req, res);
  }
);
router.get(
  "/admin/listExpert",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    getListExpert(req, res);
  }
);
router.delete(
  "/admin/deleteUser",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    deleteUser(req, res);
  }
);
module.exports = router; // export all router
