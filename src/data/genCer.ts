import { Certification } from "../models/certification";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
export const genCer = async (rootPath: string) => {
  const pathFile = getCSVFiles("certification");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    certificationId: number;
    start: string;
    end: string;
    linkDoc: string;
    status: number | null;
  }[] = [];
  const posId = header.indexOf("certificationId");
  const posStart = header.indexOf("start");
  const posEnd = header.indexOf("end");
  const posLinkDoc = header.indexOf("linkDoc");
  const posStatus = header.indexOf("status\r");

  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const certificationId = Number(field[posId]);
    const start = field[posStart];
    const end = field[posEnd];
    const linkDoc = rootPath + "/public/" + field[posLinkDoc];
    const status = Number(field[posStatus]);
    const item = {
      certificationId,
      start,
      end,
      linkDoc,
      status,
    };
    data.push(item);
  });
  await Certification.sync({ force: false })
    .then(() => Certification.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
