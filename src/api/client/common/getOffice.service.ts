import { Request, Response } from "express";
import { Office } from "../../../models/office";
import Users from "../../../models/user";
import { badRequest, success } from "../../../utils/response";

export const getListOffice = async (req: Request, res: Response) => {
  const { areaNumber, userId } = req.body;
  if (!areaNumber) return res.json(badRequest("Missing field: areaNumber"));
  if (!userId) return res.json(badRequest("Missing field: userId"));

  const userInfo = await Users.findOne({
    where: { userId },
  });
  if (userInfo?.getDataValue("areaNumber") != areaNumber)
    return res.json(badRequest("You must be authorized!"));
  Office.findAll({
    where: {
      areaNumber,
    },
  })
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(err));
};
