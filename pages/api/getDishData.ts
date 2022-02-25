// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Nutrition } from "globalType";

type dishData = {
  morning: [
    { title: string; nutrition: object },
    { title: string; nutrition: object },
    { title: string; nutrition: object }
  ];
  lunch: [
    { title: string; nutrition: object },
    { title: string; nutrition: object }
  ];
  dinner: [
    { title: string; nutrition: object },
    { title: string; nutrition: object },
    { title: string; nutrition: object }
  ];
};

const protNutrition: Nutrition = {
  biotin: 2.7,
  ca: 5,
  calorie: 19,
  carbohydrates: 0.8,
  cr: 0,
  cu: 0.01,
  dietaryFiber: 0,
  fe: 0.2,
  folate: 5,
  i: 70,
  k: 17,
  lipids: 1.2,
  mg: 1,
  mn: 0,
  mo: 0,
  na: 59,
  niacin: 0.1,
  p: 20,
  pantothenicAcid: 0.13,
  protein: 1.4,
  salt: 0.2,
  se: 3,
  suger: 0.9,
  vitA: 18,
  vitB1: 0.01,
  vitB2: 0.16,
  vitB6: 0.01,
  vitB12: 0.1,
  vitC: 0,
  vitD: 0.3,
  vitE: 0.1,
  vitK: 1,
  zn: 0.1,
};
const dish: dishData = {
  morning: [
    {
      title: "ご飯",
      nutrition: protNutrition,
    },
    {
      title: "椎茸のお吸い物",
      nutrition: protNutrition,
    },
    {
      title: "サバの味噌煮",
      nutrition: protNutrition,
    },
  ],
  lunch: [
    {
      title: "鶏そぼろのビビンバ",
      nutrition: protNutrition,
    },
    {
      title: "豆腐とわかめの中華スープ",
      nutrition: protNutrition,
    },
  ],
  dinner: [
    {
      title: "お麩の味噌汁",
      nutrition: protNutrition,
    },
    {
      title: "ハンバーグ",
      nutrition: protNutrition,
    },
    {
      title: "ポテトサラダ",
      nutrition: protNutrition,
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<dishData>
) {
  res.status(200).json(dish);
}
