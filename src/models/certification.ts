import Sequelize from "sequelize";
import { db } from "../db";
import { STATUSOFCER } from "../utils/interface";

export const Certification = db.sequelize.define(
  "certifications",
  {
    certificationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    officeId: {
      type: Sequelize.UUID,
    },
    start: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: STATUSOFCER.active,
    },
  },
  {
    initialAutoIncrement: "20",
  }
);
