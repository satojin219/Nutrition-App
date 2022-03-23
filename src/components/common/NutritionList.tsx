import { Nutrition } from "../../shared/globalType";
import React, { useCallback, useState } from "react";
import { extractNutrition } from "../../tools/HelpMethods";
import classNames from "classnames";

type Props = {
  nutrition?: Nutrition;
};
export const NutritionList: React.VFC<Props> = ({ nutrition }) => {
  let [isAllShow, setIsAllShow] = useState<boolean>(false);
  const nutritionItems =
    nutrition != undefined
      ? (Object.keys(nutrition) as (keyof Nutrition)[]).map(
          (key: keyof Nutrition, index: number) => {
            const extractedNutrition = extractNutrition(key);
            return (
              <div className="basis-1/2" key={index}>
                {extractedNutrition.nutritionName +
                  ":" +
                  nutrition[key] +
                  extractedNutrition.unit}
              </div>
            );
          }
        )
      : null;

  const handleOnClick = useCallback(() => {
    setIsAllShow((isAllShow) => !isAllShow);
  }, []);

  const showListClassNames = {
    "md:h-24 h-48 text-clip overflow-hidden": isAllShow === false,
  };

  return (
    <div className="border-2 border-red-700 rounded mt-10 sm:mx-20 p-4 bg-white">
      {nutrition != undefined ? (
        <div>
          <div
            className={classNames(
              showListClassNames,
              "md:flex flex-row flex-wrap"
            )}
          >
            {nutritionItems}
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={handleOnClick} className="text-md font-bold">
              {isAllShow ? "戻す" : "全ての栄養素を見る"}
              <span className="text-red-500">&gt;</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
