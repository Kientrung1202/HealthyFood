import Sequelize from "sequelize";
import { db } from "../db";
import { QUALIFIED } from "../utils/interface";

export const PhaseInspect = db.sequelize.define("phaseinspects", {
  phase: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inspectId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  conclude: {
    type: Sequelize.INTEGER,
    defaultValue: QUALIFIED.notqualified,
  },
});
