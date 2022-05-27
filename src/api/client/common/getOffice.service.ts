import { Request, Response } from "express";
import { Office } from "../../../models/office";
import Users from "../../../models/user";
import { success } from "../../../utils/response";

export const getListOffice = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  const userInfo = await Users.findOne({
    where: { userId },
  });
  const areaNumber = userInfo?.getDataValue("areaNumber");
  Office.findAll({
    where: {
      areaNumber,
    },
  })
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(err));
};
