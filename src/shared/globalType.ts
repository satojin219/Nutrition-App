export type UserData = {
  id: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  activeLevel: string;
};

export type dayData = {
  selectedDay: DateType;
  meals?: Meal[];
  totalIntake?: Nutrition;
};

export type DateType = {
  year: number;
  month: number;
  day: number;
  date: number;
};

export type DishType = {
  name: string;
  nutrition: Nutrition;
};

export type DishData = {
  breakfast: Menu[];
  lunch: Menu[];
  dinner: Menu[];
  snack: Menu[];
};

export type Meal = {
  whenMeal: string;
  menus?: Menu[];
  mealTotalNutrition?: Nutrition;
  imgUrls?: string[];
};

export type Menu = {
  id: number;
  recipeName?: string;
  imgUrl?: string;
  foodstuffs?: Foodstuff[];
  totalNutrition: Nutrition;
  recipes?: RecipeType[];
  tips?: string;
  cost?: number;
  time?: number;
};

export type Foodstuff = {
  id: number;
  name?: string;
  weight?: number;
  nutrition?: Nutrition;
};
export type RecipeType = {
  id: number;
  content?: string;
};

export type Nutrition = {
  calorie: number; //カロリー
  carbohydrates: number; //炭水化物
  protein: number; //たんぱく質
  lipids: number; //脂質
  suger: number; //糖質
  dietaryFiber: number; //食物繊維
  salt: number; //食塩相当量
  na: number; //ナトリウム
  k: number; //カリウム
  ca: number; //カルシウム
  mg: number; //マグネシウム
  p: number; //リン
  fe: number; //鉄
  zn: number; //亜鉛
  cu: number; //銅
  mn: number; //マンガン
  i: number; //ヨウ素
  se: number; //セレン
  cr: number; //クロム
  mo: number; //モリブデン
  vitA: number; //ビタミンA(レチノール活性当量)
  vitD: number; //ビタミンD(α-トコフェロール)
  vitE: number; //ビタミンD,
  vitK: number; //ビタミンK
  vitB1: number; //ビタミンB₁
  vitB2: number; //ビタミンB₂
  vitB6: number; //ビタミンB₆
  vitB12: number; //ビタミンB₁₂
  vitC: number; //ビタミンC
  niacin: number; //ナイアシン(ナイアシン当量)
  pantothenicAcid: number; //パントテン酸
  folate: number; //葉酸
  biotin: number; //ビオチン
};

export type fetchedFoodData = {
  field1: string;
  foodCode: string;
  field3: string;
  id: string;
  foodName: string;
  REFUSE: string;
  ENERC: string;
  ENERC_KCAL: string;
  WATER: string;
  PROTCAA: string;
  "PROT-": string;
  FATNLEA: string;
  CHOLE: string;
  "FAT-": string;
  CHOAVLM: string;
  CHOAVL: string;
  "CHOAVLDF-": string;
  "FIB-": string;
  POLYL: string;
  "CHOCDF-": string;
  OA: string;
  ASH: string;
  NA: string;
  K: string;
  CA: string;
  MG: string;
  P: string;
  FE: string;
  ZN: string;
  CU: string;
  MN: string;
  ID: string;
  SE: string;
  CR: string;
  MO: string;
  RETOL: string;
  CARTA: string;
  CARTB: string;
  CRYPXB: string;
  CARTBEQ: string;
  VITA_RAE: string;
  VITD: string;
  TOCPHA: string;
  TOCPHB: string;
  TOCPHG: string;
  TOCPHD: string;
  VITK: string;
  THIA: string;
  RIBF: string;
  NIA: string;
  NE: string;
  VITB6A: string;
  VITB12: string;
  FOL: string;
  PANTAC: string;
  BIOT: string;
  VITC: string;
  ALC: string;
  NACL_EQ: string;
  Remarks: string;
};
