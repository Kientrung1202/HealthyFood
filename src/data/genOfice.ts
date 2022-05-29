import { Office } from "../models/office";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

const genOffice = async () => {
  const pathFile = getCSVFiles("offices");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    areaNumber: number;
    nameOffice: string;
    address: string;
    owner: string;
    phone: string;
    kindOfBusiness: string;
    certificationId: number | null;
  }[] = [];
  const posArea = header.indexOf("areaNumber");
  const posNameOffice = header.indexOf("nameOffice");
  const posAddress = header.indexOf("address");
  const posKindOfBusiness = header.indexOf("kindOfBusiness");
  const posPhone = header.indexOf("phone");
  const posOwn = header.indexOf("owner");
  const posCerId = header.indexOf("certificationId\r");

  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const areaNumber = Number(field[posArea]);
    const nameOffice = field[posNameOffice];
    const address = field[posAddress];
    const phone = field[posPhone];
    const kindOfBusiness = field[posKindOfBusiness];
    const owner = field[posOwn];
    const certificationId = Number(field[posCerId]) || null;
    const item = {
      areaNumber,
      nameOffice,
      address,
      phone,
      owner,
      kindOfBusiness,
      certificationId,
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
