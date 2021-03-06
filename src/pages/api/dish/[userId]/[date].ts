// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DishData } from "../../../../shared/globalType";
import MyAppError from "../../../../server/customError";
import readDishService from "../../../../server/services/readDishService";
import createDishService from "../../../../server/services/createDishService";
import updateDishService from "../../../../server/services/updateDishService";

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
      const date: string | string[] | undefined = req.query.date;
      const userId: string | string[] | undefined = req.query.userId;
      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      }
      if (typeof userId != "string") {
        throw new MyAppError("Parameter userId must be string");
      }
      const data = await readDishService(date, userId);
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const date: string | string[] = req.query.date;
      const userId: string | string[] = req.query.userId;
      const dishData: DishData = JSON.parse(req.body || "null");

      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      } else if (typeof userId != "string") {
        throw new MyAppError("Parameter userId must be string");
      } else if (
        !(
          dishData &&
          "breakfast" in dishData &&
          "lunch" in dishData &&
          "dinner" in dishData &&
          "snack" in dishData
        )
      ) {
        throw new MyAppError("Parameter dish data is not valid");
      } else await createDishService(date, userId, dishData);
      res.status(200).send("ok");
    } else if (req.method == "PUT") {
      const date: string | string[] = req.query.date;
      const userId: string | string[] = req.query.userId;
      if (typeof date !== "string") {
        throw new MyAppError("Parameter date must be string");
      }
      if (typeof userId != "string") {
        throw new MyAppError("Parameter userId must be string");
      }
      if (req.body.breakfast)
        await updateDishService(date, userId, "breakfast", req.body.breakfast);
      else if (req.body.lunch)
        await updateDishService(date, userId, "lunch", req.body.lunch);
      else if (req.body.dinner)
        await updateDishService(date, userId, "dinner", req.body.dinner);
      else if (req.body.snack)
        await updateDishService(date, userId, "snack", req.body.snack);
      res.status(200).send("ok");
    } else {
      throw new MyAppError("?????????????????????????????????");
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
