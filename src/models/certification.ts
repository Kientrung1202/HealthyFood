import Sequelize from "sequelize";
import { db } from "../db";
import { STATUSOFCER } from "../utils/interface";

export const Certification = db.sequelize.define("certifications", {
  certificationId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  start: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  end: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  linkDoc: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: STATUSOFCER.active,
  },
});
