import { db } from "../db";
import Sequelize from "sequelize";
import { STATUSOFSAMPLE } from "../utils/interface";

export const Sample = db.sequelize.define("samples", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inspectId: {
    type: Sequelize.UUID,
  },
  sampleName: {
    type: Sequelize.STRING,
  },
  linkImage: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: STATUSOFSAMPLE.sending,
  },
});
