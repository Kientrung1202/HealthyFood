import { Request, Response } from "express";
import path from "path";
import { Certification } from "../../../models/certification";
import { Inspection } from "../../../models/inspection";
import { Office } from "../../../models/office";
import { PhaseInspect } from "../../../models/phaseInspect";
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
export const getListLinkDoc = async (req: Request, res: Response) => {
  const { officeId } = req.body;
  await Certification.findAll({ where: { officeId } })
    .then((cer) => res.json(success(cer)))
    .catch((err) => res.json(badRequest(err)));
};

export const getFile = async (req: Request, res: Response) => {
  const { linkDoc } = req.body;
  return res.sendFile(path.join(linkDoc));
};

export const updateOffice = async (req: Request, res: Response) => {
  const { officeId } = req.params;
  const { nameOffice, address, phone, owner, kindOfBusiness } = req.body;
  await Office.update(
    [{ nameOffice }, { address }, { phone }, { owner }, { kindOfBusiness }],
    {
      where: { officeId },
    }
  ).then(() => res.json(success("Update successfully")));
};

export const deleteOffice = async (req: Request, res: Response) => {
  const { officeId } = req.params;
  await Office.destroy({ where: { officeId } });
  const inspections = await Inspection.findAll({ where: { officeId } });
  Promise.all([
    inspections.map(async (inspection) => {
      const inspectId = inspection.getDataValue("inspectId");
      await PhaseInspect.destroy({ where: { inspectId } });
      await Inspection.destroy({ where: { inspectId } });
    }),
  ]).then(() => res.json(success("Delete all data about this office")));
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

export const updateCer = async (req: Request, res: Response) => {
  const { officeId, start, end, status } = req.body;
  uploadFile(req, res, async (error) => {
    if (error)
      return res.json(badRequest(`Error when trying to upload: ${error}`));
    const linkDoc = `/app/dist/public/${req.body.filename}`;
    await Certification.create({ start, end, status, officeId, linkDoc }).then(
      () => res.json(success("Update "))
    );
  });
};
