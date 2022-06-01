import { Request, Response } from "express";
import { Area } from "../../../models/area";
import { badRequest, success } from "../../../utils/response";

export const getListCity = async (req: Request, res: Response) => {
  await Area.findAll({
    attributes: ["belongToProvince"],
    group: "belongToProvince",
  })
    .then((results) => {
      console.log(results, "list city");
      const data: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      results.map((result: any) => {
        const item = result.belongToProvince;
        data.push(item);
      });
      return res.json(success(data));
    })
    .catch((err) => res.json(badRequest(err)));
};
export const getArea = async (req: Request, res: Response) => {
  const city = req.body.city;
  if (!city) return res.json(badRequest("Missing field: city"));
  await Area.findAll({
    attributes: ["areaNumber", "areaName"],
    where: {
      belongToProvince: city,
    },
  }).then((results) => {
    res.json(success(results));
  });
};
