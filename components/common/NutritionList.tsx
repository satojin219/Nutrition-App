import { Nutrition } from "globalType";
import { useCallback, useEffect, useState } from "react";
import { extractNutrition } from "../../tools/HelpMethods";

type Props = {
  nutrition: Nutrition | undefined;
};
export const NutritionList: React.VFC<Props> = (props) => {
  let [isAllShow, setIsAllShow] = useState<boolean>(false);
  const nutritionItems =
    props.nutrition != undefined
      ? Object.keys(props.nutrition).map((key: string, index: number) => {
          const extractedNutrition = extractNutrition(key);
          return (
            <div className="basis-1/2" key={index}>
              {extractedNutrition.nutritionName +
                ":" +
                props.nutrition[key] +
                extractedNutrition.unit}
            </div>
          );
        })
      : null;

  const toggleDisableNutrtion = () => {
    const target = document.getElementsByClassName("disable");
    if (isAllShow) {
      target[0].className =
        "disable md:h-24 h-48 text-clip overflow-hidden md:flex flex-row flex-wrap";
      setIsAllShow(false);
    } else {
      target[0].className = "disable md:flex flex-row flex-wrap";
      setIsAllShow(true);
    }
  };

  return (
    <div className="border-2 border-red-700 rounded mt-10 sms:mx-20 p-4 bg-white">
      {props.nutrition != undefined ? (
        <div>
          <div className="disable md:h-24 h-48 text-clip overflow-hidden md:flex flex-row flex-wrap">
            {nutritionItems}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              onClick={toggleDisableNutrtion}
              className="text-md font-bold"
            >
              {isAllShow ? "戻す" : "全ての栄養素を見る"}
              <span className="text-red-500">&gt;</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
