type extractNutrtionType = {
  unit: string,
  nutritionName: string
}
export const extractNutrition = (nutrition: string): extractNutrtionType => {
  let unit: string = "";
  let nutritionName: string = "";
  switch (nutrition) {
    case "calorie":
      return {
        unit : "kcal",
        nutritionName : "カロリー"
      }
    case "carbohydrates":
      return {
        unit : "g",
        nutritionName : "炭水化物"
      }
    case "protein":
      return{
        unit : "g",
        nutritionName : "たんぱく質"
      }
    case "lipids":
      return{
        unit : "g",
        nutritionName : "脂質"
      }
    case "suger":
      return{
        unit : "g",
        nutritionName : "糖質"
      }
    case "dietaryFiber":
      return{
        unit : "g",
        nutritionName : "食物繊維"
      }  
    case "salt":
      return{
        unit : "g",
        nutritionName : "食塩相当量"
      }
    case "na":
      return{
        unit : "mg",
        nutritionName : "ナトリウム"
      }
    case "k":
      return{
        unit : "mg",
        nutritionName : "カリウム"
      }
    case "ca":
      return{
        unit : "mg",
        nutritionName : "カルシウム"
      }
    case "mg":
      return{
        unit : "mg",
        nutritionName : "マグネシウム"
      }
    case "p":
      return{
        unit : "mg",
        nutritionName : "リン"
      }
    case "fe":
      return{
        unit : "mg",
        nutritionName : "鉄"
      }
    case "zn":
      return{
        unit : "mg",
        nutritionName : "亜鉛"
      }
    case "cu":
      return{
        unit : "mg",
        nutritionName : "銅"
      }
    case "mn":
      return{
        unit : "mg",
        nutritionName : "マンガン"
      }
    case "i":
      return{
        unit : "㎍",
        nutritionName : "ヨウ素"
      }
    case "se":
      return{
        unit : "㎍",
        nutritionName : "セレン"
      }
    case "cr":
      return{
        unit : "㎍",
        nutritionName : "クロム"
      }
    case "mo":
      return{
        unit : "㎍",
        nutritionName : "モリブデン"
      }
    case "vitA":
      return{
        unit : "㎍",
        nutritionName : "ビタミンA"
      }
    case "vitD":
      return{
        unit : "㎍",
        nutritionName : "ビタミンD"
      }
    case "vitE":
      return{
        unit : "mg",
        nutritionName : "ビタミンE"
      }
    case "vitK":
      return{
        unit : "㎍",
        nutritionName : "ビタミンK"
      }
    case "vitK":
      return{
        unit : "㎍",
        nutritionName : "ビタミンK"
      }
    case "vitB1":
      return{
        unit : "mg",
        nutritionName : "ビタミンB1"
      }
    case "vitB2":
      return{
        unit : "mg",
        nutritionName : "ビタミンB2"
      }
    case "vitB6":
      return{
        unit : "mg",
        nutritionName : "ビタミンB6"
      }
    case "vitB12":
      return{
        unit : "㎍",
        nutritionName : "ビタミンB12"
      }
    case "vitC":
      return{
        unit : "mg",
        nutritionName : "ビタミンC"
      }
    case "niacin":
      return{
        unit : "mg",
        nutritionName : "ナイアシン"
      }
    case "pantothenicAcid":
      return{
        unit : "mg",
        nutritionName : "パントテン酸"
      }
    case "folate":
      return{
        unit : "㎍",
        nutritionName : "葉酸"
      }
    case "biotin":
      return{
        unit : "㎍",
        nutritionName : "ビオチン"
      }
    default :
    return{
      unit: "",
      nutritionName: ""
    }
  }
}