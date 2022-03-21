// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DishData } from "globalType";
import dayjs from "dayjs";
import { db } from "../../../server/firebase";
import MyAppError from "../../../server/customError";

type validateDateError = {
  message: string;
  statusCode: number;
};
const emptyDishData: DishData = {
  lunch: [],
  breakfast: [],
  dinner: [],
  snack: [],
};
const isExistDate = (text: string): boolean => {
  const formatText = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return formatText === text;
};
const isBeforeToday = (text: string): boolean => {
  const today = dayjs().format("YYYYMMDD");
  const requestedDate = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return parseInt(requestedDate) <= parseInt(today);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DishData | validateDateError>
) => {
  try {
    const date: string | string[] = req.query.date;

    if (typeof date !== "string") {
      throw new MyAppError("Parameter date must be string");
    }

    if (!isExistDate(date) || !isBeforeToday(date)) {
      throw new MyAppError("Parameter date is not exist.");
    }

    const stream = await db
      .collection("user")
      .doc("GZWJqh13Te0bIAk3zrlo")
      .get();
    const data = stream.data();

    // データそのものの有無、日付単位データの有無をAND判定
    res.status(200).json(data?.dishes?.[date] || emptyDishData);
  } catch (e) {
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
