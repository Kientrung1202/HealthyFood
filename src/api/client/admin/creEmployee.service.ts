import Users from "../../../models/user";
import { Request } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { ROLE } from "../../../utils/interface";

export const createExpert = async (req: Request) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userId, userName, fullName, phone, address } = req.body;
  return Users.create({
    userId,
    userName,
    password: hash,
    fullName,
    phone,
    address,
    role: ROLE.expert,
    createdAt: new Date(),
    lastLogin: new Date(),
  });
};
export const createManage = async (req: Request) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userId, userName, fullName, phone, address } = req.body;
  return Users.create({
    userId,
    userName,
    password: hash,
    fullName,
    phone,
    address,
    role: ROLE.manage,
    createdAt: new Date(),
    lastLogin: new Date(),
  });
};
