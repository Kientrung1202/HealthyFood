import { Request, Response } from "express";
import { Area } from "../../../models/area";
import { badRequest, success } from "../../../utils/response";

export const getListCity = (req: Request, res: Response) => {
  Area.findAll({
    attributes: ["belongToProvince"],
    group: "belongToProvince",
  }).then((results) => {
    console.log(results, "list city");
    const data: string[] = [];
    results.map((result: any) => {
      const item = result.belongToProvince;
      data.push(item);
    });
    return res.json(success(data));
  });
};
export const getArea = (req: Request, res: Response) => {
  const province = req.body.city;
  if (!province) return res.json(badRequest("Missing field: city"));
  Area.findAll({
    attributes: ["areaNumber", "areaName", "userId"],
    where: {
      belongToProvince: province,
    },
  }).then((results) => {
    res.json(success(results));
  });
};
