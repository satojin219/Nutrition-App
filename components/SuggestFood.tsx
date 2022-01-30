import { foodList } from "../json/foodList"
import Fuse from "fuse.js"
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Nutrition, Foodstuff } from "globalType";
import { BsFillCalculatorFill, BsFillFileEarmarkTextFill } from "react-icons/bs"

export const SuggestFood: React.VFC = () => {

  const options = {
    threshold: 0.1,
    keys: [
      "food-name",
    ]
  };
  let fuse :Fuse<{[key:string]:string}>  =  new Fuse(foodList, options);
  let result = fuse.search("");

  const inputFoodName = useRef<HTMLInputElement>(null);
  const inputFoodWeight = useRef<HTMLInputElement>(null)
  let foodName: string = inputFoodName.current ?inputFoodName.current.value : "";
  let foodWeight: number =inputFoodWeight.current ? Number(inputFoodWeight.current.value) : 0;

  const [searchCandidates, setSearchCandidates] =useState<{[key:string]:string}[]>([])

  const handleOnChangeFood = () => {
    if (inputFoodName.current) {
      result = fuse.search(inputFoodName.current.value);
      setSearchCandidates(result);
    }
  }
  const handleOnChangeSuggest = (e: React.ChangeEvent<HTMLSelectElement>) => {

      foodName = e.currentTarget.value;
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
      let foodData = fuse.search(foodName)[0].item;

      if (foodName == "") {
        alert("食品を入力して下さい")
      } else if (foodWeight == 0) {
        alert("重量を入力して下さい")
      }


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
      const food: Foodstuff = {
        name: foodName,
        weight: foodWeight,
        nutrition: caledNutrition
      }
      console.log(food)

    
  }

  const calNutrition = (nutrition: string, decimalPoint: number): number => {
     return Number((Number(nutrition) * (foodWeight / 100)).toFixed(decimalPoint));


    
    
  }



  return (

    <form className="w-full max-w-sm m-5">
      <div className="flex justify-around items-center border-b-2 border-yellow-700/50 py-2">
        <input ref={inputFoodName} onChange={handleOnChangeFood} className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="食品名を入力して下さい" aria-label="Full name" />

        <input type="number" className="border text-sm  w-10 ml-1 rounded text-right" ref={inputFoodWeight} />
        g
        <button onClick={getFoodData} className="flex-shrink-0 bg-orange-500 hover:bg-orange-500 border-orange-500 hover:border-orange-500 text-md border-4 text-white py-1 px-2 ml-2 rounded shadow-md" type="button" >
          <BsFillCalculatorFill />
        </button>

        <button className="flex-shrink-0  hover:border-white border-white text-md border-4 text-orange-500 py-1 px-2 ml-2 rounded shadow-md">  <BsFillFileEarmarkTextFill /></button> 
        {/* 栄養素がモーダルウインドで表示される */}

      </div>
      {searchCandidates.length
        ? <select onChange={handleOnChangeSuggest} className=" inline  bg-white border border-gray-400 hover:border-gray-500 w-full mt-1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          {
            searchCandidates.map((food ) =>
        
              <option value = {food.item["food-name"]}>{food.item["food-name"]}</option>
            )}
        </select>
        : <div></div>
      }

    </form>



  )

};
