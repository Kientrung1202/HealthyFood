import { Request, Response } from "express";
import path from "path";
import sequelize from "sequelize";
import { Certification } from "../../../models/certification";
import { Eviction } from "../../../models/eviction";
import { STATUSOFCER } from "../../../utils/interface";
import { badRequest, success } from "../../../utils/response";
import fileUpload from "express-fileupload";
export const getListCer = async (req: Request, res: Response) => {
  const { officeId } = req.body;
  if (!officeId) return res.json(badRequest("Missing field: officeId"));
  await Certification.findAll({ where: { officeId } })
    .then((cer) => res.json(success(cer)))
    .catch((err) => res.json(badRequest(err)));
};

export const getEvict = async (req: Request, res: Response) => {
  const { certificationId } = req.body;
  await Eviction.findAll({ where: { certificationId } })
    .then((evict) => res.json(success(evict[0])))
    .catch((err) => res.json(badRequest(err)));
};

export const getFile = async (req: Request, res: Response) => {
  const { name } = req.params;
  return res.sendFile(path.join(`/app/dist/public/${name}`));
};

export const createCer = async (req: Request, res: Response) => {
  const { officeId, start, end, status, fileName } = req.body;
  const number = await Certification.findAll({
    attributes: [[sequelize.fn("MAX", sequelize.col("certificationId")), "id"]],
  });
  const certificationId = number[0].getDataValue("id") + 1;
  await Certification.create({
    start,
    end,
    status,
    officeId,
    certificationId,
    fileName,
  })
    .then(() => res.json(success({ certificationId })))
    .catch((err) => res.json(badRequest(err)));
};

export const extendCer = async (req: Request, res: Response) => {
  const { certificationId, end } = req.body;
  const cer = await Certification.findByPk(certificationId);
  if (cer?.getDataValue("end") > end)
    return res.json(badRequest("Can't extend with this date!"));
  await Certification.update({ end }, { where: { certificationId } })
    .then(() => res.json(success("Extend successfully!")))
    .catch((err) => res.json(badRequest(err)));
};

export const postFilePdf = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json(badRequest("No files were uploaded."));
  }
  const file = req.files.file as fileUpload.UploadedFile;
  if (file.mimetype != "application/pdf")
    return res.json(badRequest("File is not pdf file"));
  const uploadFile = Date.now() + file?.name;
  file.mv(path.join(`/app/dist/public/${uploadFile}`), (err) => {
    if (err) return res.json(badRequest(err));
    else return res.json(success(uploadFile));
  });
};

const evictCer = async (certificationId: string) => {
  const cer = await Certification.findByPk(certificationId);
  let result = false;
  if (cer?.getDataValue("status") != STATUSOFCER.evict)
    await Certification.update(
      { status: STATUSOFCER.evict },
      { where: { certificationId } }
    ).then(() => {
      result = true;
    });
  return result;
};

export const createEvict = async (req: Request, res: Response) => {
  const { certificationId, date, fileName } = req.body;
  const number = await Eviction.findAll({
    attributes: [[sequelize.fn("MAX", sequelize.col("evictionId")), "id"]],
  });
  const evictionId = number[0].getDataValue("id") + 1;
  const resEvict = await evictCer(certificationId);
  if (!resEvict) return res.json(badRequest("Can't not evict this cer"));
  await Eviction.create({ evictionId, certificationId, date, fileName })
    .then(() => res.json(success(evictionId)))
    .catch((err) => res.json(badRequest(err)));
};
