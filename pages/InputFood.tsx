import { foodList } from "../json/foodList"
import Fuse from "fuse.js"
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Nutrition,Foodstuff } from "globalType";

const InputFood: NextPage = () => {

  const options = {
    threshold: 0.1,
    keys: [
      "food-name",
    ]
  };
  let fuse = new Fuse(foodList, options);
  let result = fuse.search("");

  const inputFoodName = useRef(null);
  const inputFoodWeight = useRef(null)
  const [searchCandidates, setSearchCandidates] = useState([])

  const handleOnChange = () => {
    if (inputFoodName.current != null) {
      result = fuse.search(inputFoodName.current.value);
      setSearchCandidates(result);
    }
  }
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    inputFoodName.current.value = e.currentTarget.value;
    setSearchCandidates([]);
  }

  const getFoodData = () => {
    const options = {
      threshold: 0,//thresholdを０にしないと選択した食品以外にも検索候補が引っかかってしまい、食品を絞れないので改めてoptopnを再定義しています。
      keys: [
        "food-name",
      ]
    };
    let fuse = new Fuse(foodList, options);
    let foodData = fuse.search(inputFoodName.current.value)[0].item;
    console.log(foodData);

    let caledNutrition: Nutrition = {
      calorie: calNutrition(foodData["ENERC_KCAL"], 0),
      carbohydrates: calNutrition(foodData["CHOCDF-"], 1),
      protein: calNutrition(foodData["PROT-"], 1),
      lipids: calNutrition(foodData["FAT-"], 1),
      suger: calNutrition(foodData["CHOAVLM"], 1),
      dietaryFiber: calNutrition(foodData["FIB-"], 1),
      salt: calNutrition(foodData["NACL_EQ"], 1),
      na: calNutrition(foodData["NA"], 0),
      k: calNutrition(foodData["K"], 0),
      ca: calNutrition(foodData["CA"], 0),
      mg: calNutrition(foodData["MG"], 0),
      p: calNutrition(foodData["P"], 0),
      fe: calNutrition(foodData["FE"], 1),
      zn: calNutrition(foodData["ZN"], 1),
      cu: calNutrition(foodData["CU"], 2),
      mn: calNutrition(foodData["MN"], 2),
      i: calNutrition(foodData["ID"], 0),
      se: calNutrition(foodData["SE"], 0),
      cr: calNutrition(foodData["CR"], 0),
      mo: calNutrition(foodData["MO"], 0),
      vitA: calNutrition(foodData["RETOL"], 0),
      vitD: calNutrition(foodData["VITD"], 1),
      vitE: calNutrition(foodData["TOCPHA"], 1),
      vitK: calNutrition(foodData["VITK"], 0),
      vitB1: calNutrition(foodData["THIA"], 2),
      vitB2: calNutrition(foodData["NACL_EQ"], 2),
      vitB6: calNutrition(foodData["VITB6A"], 2),
      vitB12: calNutrition(foodData["VITB12"], 1),
      vitC: calNutrition(foodData["VITC"], 0),
      niacin: calNutrition(foodData["NIA"], 1),
      pantothenicAcid: calNutrition(foodData["PANTAC"], 2),
      folate: calNutrition(foodData["FOL"], 0),
      biotin: calNutrition(foodData["BIOT"], 1)

    }
    const food:Foodstuff = {
      name :inputFoodName.current.value,
      weight : inputFoodWeight.current.value,
      nutrition :caledNutrition
    }
    console.log(food)

  }

  const calNutrition = (nutrition: string, decimalPoint: number): number => {
    return Number((Number(nutrition) * (inputFoodWeight.current.value / 100)).toFixed(decimalPoint));
  }



  return (
    <div>
      <input className="bg-red-300" type="text" ref={inputFoodName} onChange={handleOnChange} />
      <input type="number" className="bg-yellow-200" ref={inputFoodWeight} />
      <button onClick={getFoodData} className="bg-green-200">計算</button>
      <select onChange={handleOnClick}>
        {
          searchCandidates.map((food) =>
              <option  value={food.item["food-name"]}>{food.item["food-name"]}</option>
          )}
      </select>
    </div>

  )

};
export default InputFood;