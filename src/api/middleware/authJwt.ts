import { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Users from "../../models/user";
import { ROLE } from "../../utils/interface";

const verifyToken = (req: Request, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new Error("No token provided!");
  }
  jwt.verify(token, process.env.SECRET_KEY_JWT || "", (err, decoded) => {
    console.log(process.env.SECRET_KEY_JWT);
    if (err) throw new Error(err.toString());
    else req.body.userId = decoded;
    console.log(decoded);
    next();
  });
};
const isExpert = (req: Request, next: NextFunction) => {
  Users.findByPk(req.body.userId).then((user) => {
    const role = user?.getDataValue("role");
    if (role == ROLE.expert) {
      next();
      return;
    }
    throw Error("You are not expert!");
  });
};
const isAdmin = (req: Request, next: NextFunction) => {
  Users.findByPk(req.body.userId).then((user) => {
    const role = user?.getDataValue("role");
    if (role == ROLE.admin) {
      next();
      return;
    }
    throw Error("You are not admin!");
  });
};

export const authJwt = {
  isExpert,
  isAdmin,
  verifyToken,
};
