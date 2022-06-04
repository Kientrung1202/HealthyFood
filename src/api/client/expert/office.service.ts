import { Request, Response } from "express";
import path from "path";
import sequelize from "sequelize";
import { Op } from "sequelize";
import { Area } from "../../../models/area";
import { Certification } from "../../../models/certification";
import { Eviction } from "../../../models/eviction";
import { Inspection } from "../../../models/inspection";
import { Office } from "../../../models/office";
import { PhaseInspect } from "../../../models/phaseInspect";
import Users from "../../../models/user";
import { KINDOFBUSINESS, ROLE, STATUSOFCER } from "../../../utils/interface";
import { badRequest, success } from "../../../utils/response";
import { uploadFile } from "../../common/handleFile";
import { validPhone } from "../../middleware/regex";
import fileUpload from "express-fileupload";

const findOffByStatus = async (status = 0, areaNumber: number) => {
  if (status != 0) {
    const cers = await Certification.findAll({
      attributes: ["officeId"],
      where: { status },
      group: "officeId",
    });
    const results: any[] = [];
    await Promise.all(
      cers.map(async (cer) => {
        const officeId = cer.getDataValue("officeId");
        await Office.findByPk(officeId).then((result) => {
          const item = {
            officeId,
            owner: result?.getDataValue("owner"),
            nameOffice: result?.getDataValue("nameOffice"),
            address: result?.getDataValue("address"),
            phone: result?.getDataValue("phone"),
            kindOfBusiness: result?.getDataValue("kindOfBusiness"),
            areaNumber: result?.getDataValue("areaNumber"),
          };
          if (item.areaNumber == areaNumber) results.push(item);
        });
      })
    ).then(() => results);
    return results;
  } else {
    const officeExist: string[] = [];
    // tim cac cer co officeId khac null
    const certifications = await Certification.findAll({
      attributes: ["officeId"],
      group: "officeId",
    });
    certifications.map((certi) => {
      officeExist.push(certi.getDataValue("officeId"));
    });
    const allOfficeId: string[] = [];
    await Office.findAll().then((allOffice) => {
      allOffice.map((office) => {
        allOfficeId.push(office.getDataValue("officeId"));
      });
    });
    const officeIds = allOfficeId.filter((x) => !officeExist.includes(x));
    let results: any[] = [];
    await Office.findAll({
      where: {
        officeId: { [Op.in]: officeIds },
      },
    })
      .then((data) => {
        results = data;
      })
      .then(() => results);
    return results;
  }
};

const findByKindOfBusiness = async (kind = 0, areaNumber: number) => {
  const results: any[] = [];
  if (kind == 0) {
    await Office.findAll({ where: { areaNumber } }).then((datas) => {
      datas.map((result) => {
        const item = {
          officeId: result?.getDataValue("officeId"),
          owner: result?.getDataValue("owner"),
          nameOffice: result?.getDataValue("nameOffice"),
          address: result?.getDataValue("address"),
          phone: result?.getDataValue("phone"),
          kindOfBusiness: result?.getDataValue("kindOfBusiness"),
        };
        results.push(item);
      });
    });
  }
  await Office.findAll({ where: { kindOfBusiness: kind, areaNumber } }).then(
    (datas) => {
      datas.map((result) => {
        const item = {
          officeId: result?.getDataValue("officeId"),
          owner: result?.getDataValue("owner"),
          nameOffice: result?.getDataValue("nameOffice"),
          address: result?.getDataValue("address"),
          phone: result?.getDataValue("phone"),
          kindOfBusiness: result?.getDataValue("kindOfBusiness"),
        };
        results.push(item);
      });
    }
  );
  return results;
};

export const getListOffice = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  const { status, kind } = req.query;
  let kindOfBusiness = 0;
  if (kind) kindOfBusiness = Number(kind);
  const userInfo = await Users.findOne({
    where: { userId },
  });
  let areaNumber = 0;
  if (userInfo?.getDataValue("role") == ROLE.expert) {
    areaNumber = userInfo?.getDataValue("areaNumber");
  } else if (userInfo?.getDataValue("role") == ROLE.manage)
    areaNumber = req.body.areaNumber;
  if (!areaNumber) return res.json(badRequest("Missing field areaNumber"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resultsSta: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resultsKind: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let results: any[] = [];
  if (status == "active") {
    resultsSta = await findOffByStatus(STATUSOFCER.active, areaNumber);
  } else if (status == "evict") {
    resultsSta = await findOffByStatus(STATUSOFCER.evict, areaNumber);
  } else if (status == "expire") {
    resultsSta = await findOffByStatus(STATUSOFCER.expire, areaNumber);
  } else if (status == "waiting") {
    resultsSta = await findOffByStatus(0, areaNumber);
  } else if (status == "notactive") {
    const results1 = await findOffByStatus(STATUSOFCER.evict, areaNumber);
    const results2 = await findOffByStatus(0, areaNumber);
    const results3 = await findOffByStatus(STATUSOFCER.expire, areaNumber);
    resultsSta = [...results1, ...results2, ...results3];
  } else {
    await Office.findAll({
      where: {
        areaNumber,
      },
    })
      .then((results) => {
        results.map((result) => {
          const item = {
            officeId: result?.getDataValue("officeId"),
            owner: result?.getDataValue("owner"),
            nameOffice: result?.getDataValue("nameOffice"),
            address: result?.getDataValue("address"),
            phone: result?.getDataValue("phone"),
            kindOfBusiness: result?.getDataValue("kindOfBusiness"),
          };
          resultsSta.push(item);
        });
      })
      .catch((err) => res.json(err));
  }
  if (kindOfBusiness in KINDOFBUSINESS) {
    resultsKind = await findByKindOfBusiness(kindOfBusiness, areaNumber);
  } else if (kindOfBusiness == 0) {
    resultsKind = await findByKindOfBusiness(kindOfBusiness, areaNumber);
  } else return res.json("Kind of Buisiness is invalid");
  const listOfficeId: string[] = [];
  resultsKind.map((result) => listOfficeId.push(result?.officeId));
  results = resultsSta.filter((x) => listOfficeId.includes(x?.officeId));
  console.log(resultsKind, resultsSta);
  return res.json(success(results));
};

export const getArea = async (req: Request, res: Response) => {
  const userId = req.body.user.userId;
  const userInfo = await Users.findByPk(userId);
  const role = userInfo?.getDataValue("role");
  let areaNumber = 0;
  if (role == ROLE.expert) {
    areaNumber = userInfo?.getDataValue("areaNumber");
  } else if (role == ROLE.manage) {
    const x = req.body.areaNumber;
    if (!x) return res.json(badRequest("Missing field: areaNumber"));
    else areaNumber = x;
  }

  await Area.findByPk(areaNumber)
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};

export const detailOffice = async (req: Request, res: Response) => {
  const { officeId } = req.params;
  await Office.findByPk(officeId)
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};
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
  let areaNumber = 0;
  if (userInfo?.getDataValue("role") == ROLE.expert) {
    areaNumber = userInfo?.getDataValue("areaNumber");
  } else if (userInfo?.getDataValue("role") == ROLE.manage)
    areaNumber = req.body.areaNumber;
  if (!areaNumber) return res.json(badRequest("Missing field areaNumber"));
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
