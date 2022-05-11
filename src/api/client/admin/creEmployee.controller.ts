import { Request, Response } from "express";
import "dotenv/config";
import { createExpert, createManage } from "./creEmployee.service";
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

module.exports = router; // export all router
