import Sequelize from "sequelize";
import { db } from "../db";

export const PhaseInspect = db.sequelize.define("phaseinspects", {
  phase: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inspectId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  startPhase: {
    type: Sequelize.DATEONLY,
  },
  endPhase: {
    type: Sequelize.DATEONLY,
  },
  docConclude: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  linkImage: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
