import Sequelize from "sequelize";
import { db } from "../db";

export const Area = db.sequelize.define("areas", {
  areaNumber: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  belongToProvince: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  areaName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  userId: {
    type: Sequelize.UUID,
    allowNull: true,
  },
});
