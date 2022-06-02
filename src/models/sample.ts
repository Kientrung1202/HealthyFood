import { db } from "../db";
import Sequelize from "sequelize";
import { STATUSOFSAMPLE } from "../utils/interface";

const Sample = db.sequelize.define("samples", {
  inspectionId: {
    type: Sequelize.UUID,
  },
  sampleName: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: STATUSOFSAMPLE.sending,
  },
});

export default Sample;
