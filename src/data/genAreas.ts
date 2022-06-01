import { Area } from "../models/area";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

export const genAreas = async () => {
  const pathFile = getCSVFiles("areas");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const dataSeed: {
    areaNumber: number;
    belongToProvince: string;
    areaName: string;
  }[] = [];
  const posNum = header.indexOf("areaNumber");
  const posPro = header.indexOf("belongToProvince");
  // const posName = header.indexOf("areaName\r");
  const posName = 2;
  content.map((line) => {
    const field = line.split(";");
    cleanField(field);
    const areaNumber = Number(field[posNum]);
    const belongToProvince = field[posPro];
    const areaName = field[posName];
    const item = {
      areaNumber,
      belongToProvince,
      areaName,
    };
    dataSeed.push(item);
  });
  await Area.sync({ force: false })
    .then(() => {
      return Area.bulkCreate(dataSeed);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: any) => {
      throw new Error(err.toString());
    });
};
