import { Eviction } from "../models/eviction";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
export const genEviction = async (rootPath: string) => {
  const pathFile = getCSVFiles("evictions");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    evictionId: number;
    certificationId: number;
    linkDoc: string;
    date: string;
  }[] = [];
  const posEvictId = header.indexOf("evictionId");
  const posCerId = header.indexOf("certificationId");
  const posDate = header.indexOf("date");
  // const posLinkDoc = header.indexOf("linkDoc\r");
  const posLinkDoc = 3;
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const evictionId = Number(field[posEvictId]);
    const certificationId = Number(field[posCerId]);
    const linkDoc = rootPath + "/public/" + field[posLinkDoc];
    const date = field[posDate];
    const item = {
      date,
      evictionId,
      certificationId,
      linkDoc,
    };
    data.push(item);
  });
  await Eviction.sync({ force: false })
    .then(() => Eviction.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
