// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DishData } from "globalType";
import dayjs from "dayjs";
import { db } from "../../../server/firebase";

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
  const date: string | string[] = req.query.date;
  if (typeof date !== "string") {
    throw new Error("Parameter date must be string");
  }
  try {
    if (isExistDate(date) && isBeforeToday(date)) {
      const stream = await db
        .collection("user")
        .doc("GZWJqh13Te0bIAk3zrlo")
        .get();
      const data = stream.data();

      // データそのものの有無、日付単位データの有無をAND判定
      if (!!data && !!data.dishes[date]) {
        res.status(200).json(data.dishes[date]);
      } else {
        res.status(200).json(emptyDishData);
      }
    } else {
      throw new Error("Parameter date is not exist.");
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({
        message: e.message,
        statusCode: 400,
      });
    } else {
      res.status(500).send({
        message: "Internal server error",
        statusCode: 400,
      });
    }
  }
};
export default handler;
