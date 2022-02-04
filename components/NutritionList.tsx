import { Nutrition } from "globalType"
import { useCallback, useEffect } from "react";
import { extractNutrition } from "../tools/HelpMethods"

type Props = {
  nutrition: Nutrition
}
export const NutritionList: React.VFC<Props> = (props) => {

  const nutritionItems = Object.keys(props.nutrition).map((key: string, index: number) => {

    const extractedNutrition = extractNutrition(key);
    return (
      <div className="basis-1/2" key={index}>{extractedNutrition.nutritionName + ":" + props.nutrition[key] + extractedNutrition.unit}</div>
    )
  })



  return (
    <div className="border-2 border-red-700 rounded mt-10 sms:mx-20 p-4  bg-white">
      
        <div className=" md:flex flex-row flex-wrap">{nutritionItems}</div>
      <div className="flex justify-end">
        <button className='text-md font-bold'> 詳しく見る <span className="text-red-500">&gt;</span></button>
      </div>
    </div>
  )
}

