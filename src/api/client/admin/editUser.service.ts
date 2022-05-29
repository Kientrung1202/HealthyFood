import Users from "../../../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { ROLE } from "../../../utils/interface";
import { success, badRequest } from "../../../utils/response";
import { validPhone, validPw } from "../../middleware/regex";

export const createExpert = async (req: Request, res: Response) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userName, fullName, phone, address, password } = req.body;
  const valid = validPw(password);
  const isValidPhone = validPhone(phone);
  if (valid && isValidPhone)
    return Users.create({
      userName,
      password: hash,
      fullName,
      phone,
      address,
      role: ROLE.expert,
      createdAt: new Date(),
      lastLogin: new Date(),
    });
  else if (!valid)
    return res.json(
      badRequest(
        "Mat khau toi thieu 8 ky tu, it nhat 1 chu cai, 1 so va 1 ky tu db"
      )
    );
  return res.json(
    badRequest(
      "Số điện thoại gồm 10 số nếu có nhập số 0 ở đầu tiên. Nếu không nhập 0 thì còn 9 số."
    )
  );
};
export const createManage = async (req: Request, res: Response) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userName, fullName, address, password } = req.body;
  let phone = req.body.phone;
  const valid = validPw(password);
  const isValidPhone = validPhone(phone);
  if (valid && isValidPhone) if (phone.length == 9) phone = "0" + phone;
  if (valid && isValidPhone)
    return Users.create({
      userName,
      password: hash,
      fullName,
      phone,
      address,
      role: ROLE.manage,
      createdAt: new Date(),
      lastLogin: new Date(),
    });
  else if (!valid)
    return res.json(
      badRequest(
        "Mat khau toi thieu 8 ky tu, it nhat 1 chu cai, 1 so va 1 ky tu db"
      )
    );
  return res.json(
    badRequest(
      "Số điện thoại gồm 10 số nếu có nhập số 0 ở đầu tiên. Nếu không nhập 0 thì còn 9 số."
    )
  );
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
