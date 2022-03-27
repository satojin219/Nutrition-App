// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DishData } from "../../../shared/globalType";
import MyAppError from "../../../server/customError";
import readDishService from "../../../server/services/readDishService";
import createDishService from "../../../server/services/createDishService";
import updateDishService from "../../../server/services/updateDishService";

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
      const date: string | string[] = req.query.date;
      const dishData: DishData = req.body.data;
      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      } else if (req.body.breakfast)
        await updateDishService(date, "breakfast", req.body.breakfast[0]);
      else if (req.body.lunch)
        await updateDishService(date, "lunch", req.body.lunch[0]);
      else if (req.body.dinner)
        await updateDishService(date, "dinner", req.body.dinner[0]);
      else if (req.body.snack)
        await updateDishService(date, "snack", req.body.snack[0]);
      else if (typeof date !== "string")
        throw new MyAppError("Parameter date must be string");
      else if (
        !(
          dishData &&
          "breakfast" in dishData &&
          "lunch" in dishData &&
          "dinner" in dishData &&
          "snack" in dishData
        )
      ) {
        throw new MyAppError("Parameter dish data is not valid");
      } else await createDishService(date, dishData);
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
