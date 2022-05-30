import Sequelize from "sequelize";
import { db } from "../db";

export const Eviction = db.sequelize.define("evictions", {
  evictionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  certificationId: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  linkDoc: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
