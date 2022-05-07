import { logErr } from "../services/log";
import Users from "../models/user";
import { genAreas } from "./genAreas";
import { Certification } from "../models/certification";
import { Inspection } from "../models/inspection";
import { Office } from "../models/office";
import { PhaseInspect } from "../models/phaseInspect";

const generateDb = async () => {
  try {
    await Users.sync({ force: true });
    await Certification.sync({ force: true });
    await Inspection.sync({ force: true });
    await Office.sync({ force: true });
    await PhaseInspect.sync({ force: true });
    await genAreas();
  } catch (err: any) {
    logErr("Error", err.toString());
  }
};
export default generateDb;
