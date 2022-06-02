import { Office } from "../models/office";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

const genOffice = async () => {
  const pathFile = getCSVFiles("offices");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    officeId: string;
    areaNumber: number;
    nameOffice: string;
    address: string;
    owner: string;
    phone: string;
    kindOfBusiness: string;
  }[] = [];
  const posId = header.indexOf("officeId");
  const posArea = header.indexOf("areaNumber");
  const posNameOffice = header.indexOf("nameOffice");
  const posAddress = header.indexOf("address");
  // const posKindOfBusiness = header.indexOf("kindOfBusiness\r");
  const posKindOfBusiness = 6;
  const posPhone = header.indexOf("phone");
  const posOwn = header.indexOf("owner");

  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const officeId = field[posId];
    const areaNumber = Number(field[posArea]);
    const nameOffice = field[posNameOffice];
    const address = field[posAddress];
    const phone = field[posPhone];
    const kindOfBusiness = field[posKindOfBusiness];
    const owner = field[posOwn];
    const item = {
      officeId,
      areaNumber,
      nameOffice,
      address,
      phone,
      owner,
      kindOfBusiness,
    };
    data.push(item);
  });
  await Office.sync({ force: false })
    .then(() => Office.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};

export default genOffice;
