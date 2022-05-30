import { logErr } from "../services/log";
import { genAreas } from "./genAreas";
import { Inspection } from "../models/inspection";
import { PhaseInspect } from "../models/phaseInspect";
import genUsers from "./genUsers";
import genOffice from "./genOfice";
import { genCer } from "./genCer";
import { genEviction } from "./genEviction";

const generateDb = async (rootPath: string) => {
  try {
    await Inspection.sync({ force: true });
    await PhaseInspect.sync({ force: true });
    await genEviction(rootPath);
    await genCer(rootPath);
    await genAreas();
    await genUsers();
    await genOffice();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logErr("Error", err.toString());
  }
};
export default generateDb;
