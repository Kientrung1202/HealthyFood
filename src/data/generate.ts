import { logErr } from "../services/log";
import { genAreas } from "./genAreas";
import { Certification } from "../models/certification";
import { Inspection } from "../models/inspection";
import { PhaseInspect } from "../models/phaseInspect";
import genUsers from "./genUsers";
import genOffice from "./genOfice";

const generateDb = async () => {
  try {
    await Certification.sync({ force: true });
    await Inspection.sync({ force: true });
    await PhaseInspect.sync({ force: true });
    await genAreas();
    await genUsers();
    await genOffice();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logErr("Error", err.toString());
  }
};
export default generateDb;
