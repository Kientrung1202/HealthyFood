import Sequelize from "sequelize";
import { db } from "../db";
import { KINDOFBUSINESS } from "../utils/interface";

export const Office = db.sequelize.define(
  "offices",
  {
    officeId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    areaNumber: {
      type: Sequelize.INTEGER,
    },
    nameOffice: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    kindOfBusiness: {
      type: Sequelize.INTEGER,
      defaultValue: KINDOFBUSINESS.production,
    },
    certificationId: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
