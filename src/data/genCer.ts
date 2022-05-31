import { Certification } from "../models/certification";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
export const genCer = async (rootPath: string) => {
  const pathFile = getCSVFiles("certification");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    officeId: string;
    certificationId: number;
    start: string;
    end: string;
    linkDoc: string;
    status: number | null;
  }[] = [];
  const posOfficeId = header.indexOf("officeId");
  const posId = header.indexOf("certificationId");
  const posStart = header.indexOf("start");
  const posEnd = header.indexOf("end");
  const posLinkDoc = header.indexOf("linkDoc");
  // const posStatus = header.indexOf("status\r");
  const posStatus = 5;
  let sta: number | null = null;
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const officeId = field[posOfficeId];
    const certificationId = Number(field[posId]);
    const start = field[posStart];
    const end = field[posEnd];
    const linkDoc = rootPath + "/public/" + field[posLinkDoc];
    if (field[posStatus]) sta = Number(field[posStatus]);
    const item = {
      officeId,
      certificationId,
      start,
      end,
      linkDoc,
      status: sta,
    };
    data.push(item);
  });
  await Certification.sync({ force: false })
    .then(() => Certification.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};
