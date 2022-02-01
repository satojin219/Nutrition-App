

export type UserData ={
  id :number,
  name :string,
  age :number,
  gender :string,
  weight :number,
  height :number,
  activeLevel :number,
  menus :Menus[],
  editedDates :Date[],
  selectedDate :Date,
  totalIntake :Nutrition
}

export interface Date{
  year :number,
  month :number,
  date :number,
  day :number
}

export interface Menus  {
  recipes :Recipe[],
}
 export interface Recipe  {
  recipeName :string,
  img :string,
  foodstuffs :Foodstuff[],
  totalNutrition :Nutrition
}
export interface Foodstuff  {
  name :string,
  weight :number,
  nutrition :Nutrition
}

export interface Nutrition {
  calorie :number, //カロリー
  carbohydrates :number, //炭水化物
  protein :number, //たんぱく質
  lipids :number, //脂質
  suger :number, //糖質
  dietaryFiber :number, //食物繊維
  salt :number,//食塩相当量
  na :number, //ナトリウム
  k :number, //カリウム
  ca :number, //カルシウム
  mg :number, //マグネシウム
  p :number, //リン
  fe :number, //鉄
  zn :number, //亜鉛
  cu :number, //銅
  mn :number, //マンガン
  i :number, //ヨウ素
  se :number, //セレン
  cr :number, //クロム
  mo :number, //モリブデン
  vitA :number, //ビタミンA(レチノール活性当量)
  vitD :number, //ビタミンD(α-トコフェロール)
  vitE :number, //ビタミンD,
  vitK :number, //ビタミンK
  vitB1 :number, //ビタミンB₁
  vitB2 :number, //ビタミンB₂
  vitB6 :number, //ビタミンB₆
  vitB12 :number, //ビタミンB₁₂
  vitC :number, //ビタミンC
  niacin :number, //ナイアシン(ナイアシン当量)
  pantothenicAcid :number //パントテン酸
  folate :number //葉酸
  biotin :number //ビオチン
}