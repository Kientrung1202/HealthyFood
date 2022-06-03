import { Inspection } from "../models/inspection";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
export const genInspections = async () => {
  const pathFile = getCSVFiles("inspects");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    inspectId: string;
    inspectionName: string;
    startInspect: string;
    endInspect: string;
    userId: string;
    officeId: string;
  }[] = [];
  const posOfficeId = 5;
  const posId = header.indexOf("inspectId");
  const posName = header.indexOf("inspectionName");
  const posStart = header.indexOf("startInspect");
  const posEnd = header.indexOf("endInspect");
  const posUserId = header.indexOf("userId");
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const officeId = field[posOfficeId];
    const inspectionName = field[posName];
    const startInspect = field[posStart];
    const endInspect = field[posEnd];
    const inspectId = field[posId];
    const userId = field[posUserId];
    const item = {
      officeId,
      inspectionName,
      startInspect,
      endInspect,
      inspectId,
      userId,
    };
    data.push(item);
  });
  await Inspection.sync({ force: false })
    .then(() => Inspection.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
