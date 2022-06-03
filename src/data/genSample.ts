import { Sample } from "../models/sample";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

export const genSamples = async () => {
  const pathFile = getCSVFiles("samples");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    id: number;
    inspectId: string;
    sampleName: string;
    linkImage: string;
    status: number | null;
  }[] = [];
  const posId = header.indexOf("id");
  const posName = header.indexOf("sampleName");
  const posInspectId = header.indexOf("inspectId");
  const posImage = header.indexOf("linkImage");
  const posStatus = 4;
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const id = Number(field[posId]);
    const sampleName = field[posName];
    const inspectId = field[posInspectId];
    const linkImage = field[posImage];
    const status = Number(field[posStatus]) || null;
    const item = {
      id,
      sampleName,
      inspectId,
      linkImage,
      status,
    };
    data.push(item);
  });
  await Sample.sync({ force: false })
    .then(() => Sample.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
