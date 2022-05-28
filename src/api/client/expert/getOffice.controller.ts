import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import { getListOffice } from "./getOffice.service";
const router = express.Router();

router.get("/listOffice", authJwt.isUser, (req: Request, res: Response) => {
  getListOffice(req, res);
});

module.exports = router;
