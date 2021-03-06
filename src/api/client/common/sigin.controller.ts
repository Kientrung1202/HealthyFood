import { Request, Response } from "express";
import express from "express";
import { signIn } from "./signin.service";

const router = express.Router();

router.post("/signin", (req: Request, res: Response) => {
  signIn(req, res);
});
module.exports = router; // export all router
