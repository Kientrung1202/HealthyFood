import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createInspection,
  getListInspection,
  updatePhase,
} from "./inspect.service";
const router = express.Router();

router.get("/inspects", authJwt.isExpert, (req: Request, res: Response) => {
  getListInspection(req, res);
});
router.post("/inspect", authJwt.isExpert, (req: Request, res: Response) => {
  createInspection(req, res);
});
router.put("/phase", authJwt.isExpert, (req: Request, res: Response) => {
  updatePhase(req, res);
});
module.exports = router;