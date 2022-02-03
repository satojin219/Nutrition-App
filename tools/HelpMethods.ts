export const extractNutrition = (nutrition: string): { unit: string, nutritionName: string }=> {
  let unit: string = "";
  let nutritionName: string = "";
  switch (nutrition) {
    case "calorie":
      unit = "kcal";
      nutritionName = "カロリー";
      break;
    case "carbohydrates":
      unit = "g";
      nutritionName = "炭水化物";
      break;
    case "protein":
      unit = "g";
      nutritionName = "たんぱく質";
      break;
    case "lipids":
      unit = "g";
      nutritionName = "脂質";
      break;
    case "suger":
      unit = "g";
      nutritionName = "糖質";
      break;
    case "dietaryFiber":
      unit = "g";
      nutritionName = "食物繊維";
      break;
    case "salt":
      unit = "g";
      nutritionName = "食塩相当量";
      break;
    case "na":
      unit = "mg";
      nutritionName = "ナトリウム";
    case "k":
      unit = "mg";
      nutritionName = "カリウム";
      break;
    case "ca":
      unit = "mg";
      nutritionName = "カルシウム";
      break;
    case "mg":
      unit = "mg";
      nutritionName = "マグネシウム";
      break;
    case "p":
      unit = "mg";
      nutritionName = "リン";
      break;
    case "fe":
      unit = "mg";
      nutritionName = "鉄";
      break;
    case "zn":
      unit = "mg";
      nutritionName = "亜鉛";
      break;
    case "cu":
      unit = "mg";
      nutritionName = "銅";
    case "mn":
      unit = "mg";
      nutritionName = "マンガン";
      break;
    case "i":
      unit = "㎍";
      nutritionName = "ヨウ素";
      break;
    case "se":
      unit = "㎍";
      nutritionName = "セレン";
      break;
    case "cr":
      unit = "㎍";
      nutritionName = "クロム";
      break;
    case "mo":
      unit = "㎍";
      nutritionName = "モリブデン";
      break;
    case "vitA":
      unit = "㎍";
      nutritionName = "ビタミンA";
      break;
    case "vitD":
      unit = "㎍";
      nutritionName = "ビタミンD";
      break;
    case "vitE":
      unit = "mg";
      nutritionName = "ビタミンE";
    case "vitK":
      unit = "㎍";
      nutritionName = "ビタミンK";
      break;
    case "vitK":
      unit = "㎍";
      nutritionName = "ビタミンK";
    case "vitB1":
      unit = "mg";
      nutritionName = "ビタミンB1";
      break;
    case "vitB2":
      unit = "mg";
      nutritionName = "ビタミンB2";
      break;
    case "vitB6":
      unit = "mg";
      nutritionName = "ビタミンB6";
      break;
    case "vitB12":
      unit = "㎍";
      nutritionName = "ビタミンB12";
    case "vitC":
      unit = "mg";
      nutritionName = "ビタミンC";
    case "niacin":
      unit = "mg";
      nutritionName = "ナイアシン";
      break;
    case "pantothenicAcid":
      unit = "mg";
      nutritionName = "パントテン酸";
      break;
    case "folate":
      unit = "㎍";
      nutritionName = "葉酸";
      break;
    case "biotin":
      unit = "㎍";
      nutritionName = "ビオチン";
      break;
  }
  return {unit :unit,nutritionName :nutritionName}
}