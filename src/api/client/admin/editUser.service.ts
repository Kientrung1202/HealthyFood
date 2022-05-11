import Users from "../../../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { ROLE } from "../../../utils/interface";
import { success, badRequest } from "../../../utils/response";

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
export const getListMange = (req: Request, res: Response) => {
  Users.findAll({
    attributes: ["userId", "fullName", "phone", "address"],
    where: {
      role: ROLE.manage,
    },
  }).then((results) => {
    res.json(success(results));
  });
};
export const getListExpert = (req: Request, res: Response) => {
  Users.findAll({
    attributes: ["userId", "fullName", "phone", "address"],
    where: {
      role: ROLE.expert,
    },
  }).then((results) => {
    res.json(success(results));
  });
};
export const deleteUser = (req: Request, res: Response) => {
  const userId = req.body.userId;
  if (!userId) return res.json(badRequest("Missing field: userId"));
  Users.destroy({
    where: { userId },
  })
    .then(() => res.json(success("Deleted user!")))
    .catch((err) => res.json(badRequest(err)));
};
