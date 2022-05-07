import Sequelize from "sequelize";
import { db } from "../db";

export const Inspection = db.sequelize.define("inspections", {
  inspectNumber: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  inspectionName: {
    type: Sequelize.STRING,
  },
  startInspect: {
    type: Sequelize.DATEONLY,
  },
  endInspect: {
    type: Sequelize.DATEONLY,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
