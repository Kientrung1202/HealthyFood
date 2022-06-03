import { PhaseInspect } from "../models/phaseInspect";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

export const genPhases = async () => {
  const pathFile = getCSVFiles("phases");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    phase: number;
    inspectId: string;
    conclude: number;
    penalizeLink: string | null;
  }[] = [];
  const posPhase = header.indexOf("phase");
  const posInspectId = header.indexOf("inspectId");
  const posConclude = header.indexOf("conclude");
  const posPe = 3;
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const phase = Number(field[posPhase]);
    const inspectId = field[posInspectId];
    const conclude = Number(field[posConclude]);
    const penalizeLink = field[posPe] || null;
    const item = {
      phase,
      inspectId,
      conclude,
      penalizeLink,
    };
    data.push(item);
  });
  await PhaseInspect.sync({ force: false })
    .then(() => PhaseInspect.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
