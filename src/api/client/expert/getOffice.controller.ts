import { Request, Response } from "express";
import express from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createOffice,
  deleteOffice,
  detailOffice,
  getFile,
  getListLinkDoc,
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

router.get("/files", authJwt.isUser, async (req: Request, res: Response) => {
  getListLinkDoc(req, res);
});

router.get("/file", authJwt.isUser, async (req: Request, res: Response) => {
  getFile(req, res);
});

// router.get("/test", async (req: Request, res: Response) => {
//   return res.sendFile(path.join(`/app/dist/public/1.pdf`));
// });

module.exports = router;
