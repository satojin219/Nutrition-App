import {
  Foodstuff,
  Nutrition,
  DateType,
  DishData,
  DishType,
  Menu,
} from "../shared/globalType";

type extractNutrtionType = {
  unit: string;
  nutritionName: string;
};
export const extractNutrition = (nutrition: string): extractNutrtionType => {
  switch (nutrition) {
    case "calorie":
      return {
        unit: "kcal",
        nutritionName: "カロリー",
      };
    case "carbohydrates":
      return {
        unit: "g",
        nutritionName: "炭水化物",
      };
    case "protein":
      return {
        unit: "g",
        nutritionName: "たんぱく質",
      };
    case "lipids":
      return {
        unit: "g",
        nutritionName: "脂質",
      };
    case "suger":
      return {
        unit: "g",
        nutritionName: "糖質",
      };
    case "dietaryFiber":
      return {
        unit: "g",
        nutritionName: "食物繊維",
      };
    case "salt":
      return {
        unit: "g",
        nutritionName: "食塩相当量",
      };
    case "na":
      return {
        unit: "mg",
        nutritionName: "ナトリウム",
      };
    case "k":
      return {
        unit: "mg",
        nutritionName: "カリウム",
      };
    case "ca":
      return {
        unit: "mg",
        nutritionName: "カルシウム",
      };
    case "mg":
      return {
        unit: "mg",
        nutritionName: "マグネシウム",
      };
    case "p":
      return {
        unit: "mg",
        nutritionName: "リン",
      };
    case "fe":
      return {
        unit: "mg",
        nutritionName: "鉄",
      };
    case "zn":
      return {
        unit: "mg",
        nutritionName: "亜鉛",
      };
    case "cu":
      return {
        unit: "mg",
        nutritionName: "銅",
      };
    case "mn":
      return {
        unit: "mg",
        nutritionName: "マンガン",
      };
    case "i":
      return {
        unit: "㎍",
        nutritionName: "ヨウ素",
      };
    case "se":
      return {
        unit: "㎍",
        nutritionName: "セレン",
      };
    case "cr":
      return {
        unit: "㎍",
        nutritionName: "クロム",
      };
    case "mo":
      return {
        unit: "㎍",
        nutritionName: "モリブデン",
      };
    case "vitA":
      return {
        unit: "㎍",
        nutritionName: "ビタミンA",
      };
    case "vitD":
      return {
        unit: "㎍",
        nutritionName: "ビタミンD",
      };
    case "vitE":
      return {
        unit: "mg",
        nutritionName: "ビタミンE",
      };
    case "vitK":
      return {
        unit: "㎍",
        nutritionName: "ビタミンK",
      };
    case "vitK":
      return {
        unit: "㎍",
        nutritionName: "ビタミンK",
      };
    case "vitB1":
      return {
        unit: "mg",
        nutritionName: "ビタミンB1",
      };
    case "vitB2":
      return {
        unit: "mg",
        nutritionName: "ビタミンB2",
      };
    case "vitB6":
      return {
        unit: "mg",
        nutritionName: "ビタミンB6",
      };
    case "vitB12":
      return {
        unit: "㎍",
        nutritionName: "ビタミンB12",
      };
    case "vitC":
      return {
        unit: "mg",
        nutritionName: "ビタミンC",
      };
    case "niacin":
      return {
        unit: "mg",
        nutritionName: "ナイアシン",
      };
    case "pantothenicAcid":
      return {
        unit: "mg",
        nutritionName: "パントテン酸",
      };
    case "folate":
      return {
        unit: "㎍",
        nutritionName: "葉酸",
      };
    case "biotin":
      return {
        unit: "㎍",
        nutritionName: "ビオチン",
      };
    default:
      return {
        unit: "",
        nutritionName: "",
      };
  }
};

/**
 *
 * @JavaScriptでの小数点の計算の誤差をケアする関数
 *
 * 計算した数値を文字列に変換した時、少数第３位に値があればそれを丸める関数。（食品成分表の栄養素は少数第２位まで表示するので第3位があるものは誤差が生じている証拠）
 */
export const roundNutritionValue = (nutritionValue: number): number => {
  const strValue = String(nutritionValue);

  if (strValue[strValue.indexOf(".") + 4]) {
    return Number(strValue.slice(0, strValue.indexOf(".") + 3));
  }

  return Number(strValue);
};
type haveId = {
  id: number;
};
export const addElement = <T extends haveId>(
  state: T[],
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  index?: number
): void => {
  let copyArray = [...state];
  // indexが引数にない時はfoodstuffs,menuCardsコンポーネントの時、indexが引数にある時はrecipeコンポーネントの時。※途中に要素を追加するため、indexが必要
  const uniqeID: number = new Date().getTime();
  if (index == null || index == copyArray.length - 1) {
    copyArray.push({ id: uniqeID } as T);
  } else {
    copyArray.splice(index! + 1, 0, { id: uniqeID } as T);
  }
  setState(copyArray);
};

export const removeElemnt = <T>(
  state: T[],
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  index: number
): void => {
  let copyArray = [...state];
  copyArray.splice(index, 1);
  setState(copyArray);
};

export const calSumNutrition = (nutritions: Nutrition[]) => {
  const sumNutrition: Nutrition = {
    calorie: 0,
    carbohydrates: 0,
    protein: 0,
    lipids: 0,
    suger: 0,
    dietaryFiber: 0,
    salt: 0,
    na: 0,
    k: 0,
    ca: 0,
    mg: 0,
    p: 0,
    fe: 0,
    zn: 0,
    cu: 0,
    mn: 0,
    i: 0,
    se: 0,
    cr: 0,
    mo: 0,
    vitA: 0,
    vitD: 0,
    vitE: 0,
    vitK: 0,
    vitB1: 0,
    vitB2: 0,
    vitB6: 0,
    vitB12: 0,
    vitC: 0,
    niacin: 0,
    pantothenicAcid: 0,
    folate: 0,
    biotin: 0,
  };
  nutritions.forEach((nutrition) => {
    sumNutrition.calorie += nutrition.calorie;
    sumNutrition.carbohydrates += nutrition.carbohydrates;
    sumNutrition.protein += nutrition.protein;
    sumNutrition.lipids += nutrition.lipids;
    sumNutrition.suger += nutrition.suger;
    sumNutrition.dietaryFiber += nutrition.dietaryFiber;
    sumNutrition.salt += nutrition.salt;
    sumNutrition.na += nutrition.na;
    sumNutrition.k += nutrition.k;
    sumNutrition.ca += nutrition.ca;
    sumNutrition.mg += nutrition.mg;
    sumNutrition.p += nutrition.p;
    sumNutrition.fe += nutrition.fe;
    sumNutrition.zn += nutrition.zn;
    sumNutrition.cu += nutrition.cu;
    sumNutrition.mn += nutrition.mn;
    sumNutrition.i += nutrition.i;
    sumNutrition.se += nutrition.se;
    sumNutrition.cr += nutrition.cr;
    sumNutrition.mo += nutrition.mo;
    sumNutrition.vitA += nutrition.vitA;
    sumNutrition.vitD += nutrition.vitD;
    sumNutrition.vitE += nutrition.vitE;
    sumNutrition.vitK += nutrition.vitK;
    sumNutrition.vitB1 += nutrition.vitB1;
    sumNutrition.vitB2 += nutrition.vitB2;
    sumNutrition.vitB6 += nutrition.vitB6;
    sumNutrition.vitB12 += nutrition.vitB12;
    sumNutrition.vitC += nutrition.vitC;
    sumNutrition.niacin += nutrition.niacin;
    sumNutrition.pantothenicAcid += nutrition.pantothenicAcid;
    sumNutrition.folate += nutrition.folate;
    sumNutrition.biotin += nutrition.biotin;
  });
  return sumNutrition;
};

export const calSumNutritionFromFoodstuff = (
  array: Foodstuff[] | DishType[]
): Nutrition | undefined => {
  if (array.length == 0) return;
  const nutritions = array
    .map((item: Foodstuff | DishType) => item.nutrition)
    .filter((item) => item !== undefined) as Nutrition[]; // FIXME 型安全性の確保
  const sumNutrition = calSumNutrition(nutritions);
  //少数第３位以上のものは丸める
  (Object.keys(sumNutrition) as (keyof Nutrition)[]).map(
    (key: keyof Nutrition) => {
      sumNutrition[key] = roundNutritionValue(sumNutrition[key]);
    }
  );
  return sumNutrition;
};
export const calSumDailyIntakeNutrition = (dishData: DishData) => {
  let sumNutrition: Nutrition[] = [];
  dishData.breakfast.map((menu: Menu) => {
    sumNutrition.push(menu.totalNutrition);
  });
  dishData.lunch.map((menu: Menu) => {
    sumNutrition.push(menu.totalNutrition);
  });
  dishData.dinner.map((menu: Menu) => {
    sumNutrition.push(menu.totalNutrition);
  });
  dishData.snack.map((menu: Menu) => {
    sumNutrition.push(menu.totalNutrition);
  });
  const resNutrition = calSumNutrition(sumNutrition);
  //少数第３位以上のものは丸める
  (Object.keys(resNutrition) as (keyof Nutrition)[]).map(
    (key: keyof Nutrition) => {
      resNutrition[key] = roundNutritionValue(resNutrition[key]);
    }
  );
  return resNutrition;
};
/**
 * @fetchUsrData
 * ローカルストレージまたは、Firebaseに保存してあるユーザーのデータを持ってくる。
 */
// export const fetchUserData: UserData = () => {};

export const getTodayData = (): DateType => {
  // Dateオブジェクトをインスタンス化するとエラーが出るので、仮の値を入れておきます。
  return {
    year: 2022,
    month: 2,
    day: 19,
    date: 19,
  };
};
/**
 * @isEditedDate
 * 今日の日付が既に編集済みの日付かをUserDataのeditedDayDatesの中から判定する。
 */
// export const isEditedDate = (date :Date): boolean => {};
