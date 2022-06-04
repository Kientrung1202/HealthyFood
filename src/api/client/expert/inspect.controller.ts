import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createInspection,
  deleteSample,
  getListInspection,
  getListSample,
  postImg,
  postSample,
  updatePhase,
  updateStatusOfSample,
} from "./inspect.service";
const router = express.Router();

// lay ra cac cuoc khao sat
router.get("/inspects", authJwt.isExpert, (req: Request, res: Response) => {
  getListInspection(req, res);
});

// tao 1 cuoc khao sat moi
router.post("/inspect", authJwt.isExpert, (req: Request, res: Response) => {
  createInspection(req, res);
});

// conclude phase
router.put("/phase", authJwt.isExpert, (req: Request, res: Response) => {
  updatePhase(req, res);
});

// lay cac mau vat ra
router.get("/samples", authJwt.isExpert, (req: Request, res: Response) => {
  getListSample(req, res);
});

// tao 1 mau vat moi
router.post("/sample", authJwt.isExpert, (req: Request, res: Response) => {
  postSample(req, res);
});

// update trang thai cua mau vat
router.put("/sample", authJwt.isExpert, (req: Request, res: Response) => {
  updateStatusOfSample(req, res);
});

// delete sample
router.delete("/sample", authJwt.isExpert, (req: Request, res: Response) => {
  deleteSample(req, res);
});

// post anh len server, dung de lay ra anh
router.post("/fileImg", authJwt.isExpert, (req: Request, res: Response) => {
  postImg(req, res);
});
module.exports = router;
