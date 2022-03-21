// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DishData } from "globalType";
import MyAppError from "../../../server/customError";
import readDishService from "../../../server/services/readDishService";
import createDishService from "../../../server/services/createDishService";

type validateDateError = {
  message: string;
  statusCode: number;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DishData | validateDateError | string>
) => {
  try {
    if (req.method === "GET") {
      const date: string | string[] = req.query.date;
      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      }
      const data = await readDishService(date);
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const date: string | string[] = req.body.date;
      const dishData: DishData = req.body.data;
      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      }
      await createDishService(date, dishData);
      res.status(200).send("ok");
    } else {
      throw new MyAppError("リクエストが不正です。");
    }
  } catch (e) {
    console.error(`Error!! : ${e}`);

    if (e instanceof MyAppError) {
      res.status(e.statusCode).send({
        message: e.message,
        statusCode: e.statusCode,
      });
    } else {
      res.status(500).send({
        message: "Internal server error",
        statusCode: 500,
      });
    }
  }
};
export default handler;
