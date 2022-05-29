import { Request, Response } from "express";
import { Certification } from "../../../models/certification";
import { Office } from "../../../models/office";
import Users from "../../../models/user";
import { badRequest, success } from "../../../utils/response";
import { uploadFile } from "../../common/handleFile";
import { validPhone } from "../../middleware/regex";

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

export const detailOffice = async (req: Request, res: Response) => {
  const { officeId } = req.params;
  await Office.findByPk(officeId)
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};
export const getLinkDoc = async (req: Request, res: Response) => {
  const { officeId } = req.params;
  const office = await Office.findByPk(officeId);
  const cerId = office?.getDataValue("certificationId");
  const cer = await Certification.findByPk(cerId);
  const linkDoc = cer?.getDataValue("linkDoc");
  if (linkDoc == null) return res.json(success("Dont have link"));
  else res.sendFile(linkDoc);
};

export const createOffice = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  const { nameOffice, address, phone, kindOfBusiness, owner } = req.body;
  if (!validPhone(phone))
    return res.json(badRequest("Phone is not valid in Viet Nam!"));
  const userInfo = await Users.findOne({
    where: { userId },
  });
  const areaNumber = userInfo?.getDataValue("areaNumber");
  await Office.create({
    areaNumber,
    nameOffice,
    address,
    kindOfBusiness,
    owner,
    phone,
  })
    .then(() => res.json(success("Create office successfully")))
    .then((err) => res.json(badRequest(err.toString())));
};

// export const updateCer = async (req: Request, res: Response) => {
//   const { userId } = req.body.user;
//   const { officeId, certificationId, start, end, status } = req.body;
//   uploadFile(req, res, async (error) => {
//     if (error)
//       return res.json(badRequest(`Error when trying to upload: ${error}`));
//     const path = `/app/dist/public/${req.file.filename}`;
//     const office = await Office.findByPk(officeId);
//   });
// };
