import { logErr } from "../services/log";
import { genAreas } from "./genAreas";
import genUsers from "./genUsers";
import genOffice from "./genOfice";
import { genCer } from "./genCer";
import { genEviction } from "./genEviction";
import { genInspections } from "./genInspect";
import { genPhases } from "./genPhases";
import { genSamples } from "./genSample";

const generateDb = async () => {
  try {
    await genPhases();
    await genSamples();
    await genInspections();
    await genEviction();
    await genCer();
    await genAreas();
    await genUsers();
    await genOffice();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logErr("Error", err.toString());
  }
};
export default generateDb;
