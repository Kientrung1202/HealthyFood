import Users from "../../../models/user";
import { badRequest, success } from "../../../utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";

export const signIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const userInfo = await Users.findOne({
    attributes: [
      "userId",
      "fullName",
      "password",
      "phone",
      "address",
      "areaNumber",
    ],
    where: { userName },
  });
  if (!userInfo) {
    return res.json(badRequest("Username or password is incorrect!"));
  } else {
    bcrypt.compare(
      password,
      userInfo.getDataValue("password"),
      (err, result) => {
        if (err) return res.json(badRequest("Password is incorrect!"));
        if (result) {
          const token = jwt.sign(
            {
              userName,
              userId: userInfo.getDataValue("userId"),
            },
            process.env.SECRET_KEY_JWT || "healthy",
            {
              expiresIn: "7d", // if this is number, this is second
            }
          );
          Users.update(
            { lastLogin: new Date() },
            { where: { userId: userInfo.getDataValue("userId") } }
          )
            .then(() => {
              return res.json(
                success({
                  token,
                  userId: userInfo.getDataValue("userId"),
                  fullName: userInfo.getDataValue("fullName"),
                  phone: userInfo.getDataValue("phone"),
                  address: userInfo.getDataValue("address"),
                  areaNumber: userInfo.getDataValue("areaNumber"),
                  role: userInfo.getDataValue("role"),
                })
              );
            })
            .catch((err) => {
              return res.json(badRequest(err));
            });
        }
      }
    );
  }
};
