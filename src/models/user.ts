import { db } from "../db";
import { ROLE } from "../utils/interface";
import Sequelize from "sequelize";

const Users = db.sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    fullName: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: ROLE.expert,
      get() {
        return this.getDataValue("role");
      },
    },
    areaNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
    timestamps: false,
  }
);
export default Users;
