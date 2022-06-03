import { Request, Response } from "express";
import { Inspection } from "../../../models/inspection";
import { Office } from "../../../models/office";
import { PhaseInspect } from "../../../models/phaseInspect";
import Users from "../../../models/user";
import { PHASEINSPECT, ROLE } from "../../../utils/interface";
import { badRequest, success } from "../../../utils/response";
import { v4 as uuidv4 } from "uuid";
import { Sample } from "../../../models/sample";

export const getListInspection = async (req: Request, res: Response) => {
  const { userId } = req.body.user;
  const userInfo = await Users.findOne({
    where: { userId },
  });
  let areaNumber = 0;
  if (userInfo?.getDataValue("role") == ROLE.expert) {
    areaNumber = userInfo?.getDataValue("areaNumber");
  } else if (userInfo?.getDataValue("role") == ROLE.manage)
    areaNumber = req.body.areaNumber;
  if (!areaNumber) return res.json(badRequest("Missing field areaNumber"));
  const officeIds: string[] = [];
  const offices = Office.findAll({ where: { areaNumber } });
  (await offices).map((office) => {
    officeIds.push(office.getDataValue("officeId"));
  });
  const results: any[] = [];
  Promise.all(
    officeIds.map(async (officeId: string) => {
      await Inspection.findAll({ where: { officeId } }).then((inspects) => {
        inspects.map((inspect) => results.push(inspect));
      });
    })
  ).then(() => res.json(results));
};

export const createInspection = async (req: Request, res: Response) => {
  let userId = req.body.user.userId;
  const userInfo = await Users.findByPk(userId);
  if (userInfo?.getDataValue("role") != ROLE.expert) {
    userId = req.body.userId;
  }
  if (!userId) return res.json(badRequest("Missing field: userId"));
  const inspectId = uuidv4();
  const { inspectionName, startInspect, endInspect, officeId } = req.body;
  const phases = [
    PHASEINSPECT.inspectAtOffice,
    PHASEINSPECT.experiment,
    PHASEINSPECT.conclude,
    PHASEINSPECT.penalize,
  ];
  const inspect = Inspection.create({
    inspectId,
    inspectionName,
    startInspect,
    endInspect,
    officeId,
    userId,
  });
  Promise.all([
    phases.map(async (phase) => {
      await PhaseInspect.create({ phase, inspectId });
    }),
    inspect,
  ])
    .then(() => res.json(success("Create inspection successfully!")))
    .catch((err) => res.json(badRequest(err)));
};

export const updatePhase = async (req: Request, res: Response) => {
  const { inspectId, phase, conclude } = req.body;
  await PhaseInspect.update({ conclude }, { where: { inspectId, phase } })
    .then(() => res.json(success("Update phase successfully!")))
    .catch((err) => res.json(badRequest(err)));
};

export const getListSample = async (req: Request, res: Response) => {
  const { inspectId } = req.body;
  await Sample.findAll({ where: { inspectId } })
    .then((results) => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};

// export const postSample = async (req: Request, res: Response) => {
//   const {inspectId, sampleName, linkImage, status}
// }
