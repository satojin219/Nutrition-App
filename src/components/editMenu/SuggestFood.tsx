import { foodList } from "../../json/foodList";
import Fuse from "fuse.js";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Nutrition, Foodstuff, fetchedFoodData } from "../../shared/globalType";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from "../common/Modal";
import { IsModalShowContext } from "../../pages/_app";

type Props = {
  index: number;
  foodstuff: Foodstuff;
  removeFoodstuff(index: number): void;
  updateFoodstuff(data: Foodstuff): void;
};

export const SuggestFood: React.VFC<Props> = (props) => {
  const { openModal } = useContext(IsModalShowContext);
  const foodstuff = props.foodstuff;
  const fuse: Fuse<fetchedFoodData> = useMemo(() => {
    const options = {
      threshold: 0.1,
      keys: ["foodName"],
    };
    return new Fuse(foodList, options);
  }, []);

  const inputFoodNameRef = useRef<HTMLInputElement>(null!);
  const inputFoodWeightRef = useRef<HTMLInputElement>(null!);
  let foodName: string = inputFoodNameRef.current
    ? inputFoodNameRef.current.value
    : "";
  useEffect(() => {
    inputFoodNameRef.current.value = props.foodstuff.name ?? "";
    inputFoodWeightRef.current.value = props.foodstuff.weight?.toString() ?? "";
  }, []);
  const [searchCandidates, setSearchCandidates] = useState<
    Fuse.FuseResult<fetchedFoodData>[]
  >([]);

  const handleOnChangeFood = useCallback((): void => {
    setSearchCandidates(fuse.search(inputFoodNameRef.current.value));
  }, [fuse]);

  const handleOnChangeSuggest = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      inputFoodNameRef.current.value = e.currentTarget.value;
      setSearchCandidates([]);
    },
    []
  );

  const identifyFoodData = (): fetchedFoodData | null => {
    const searcedFoodData = fuse.search(foodName);
    return searcedFoodData.length != 0
      ? searcedFoodData.filter((food) => food.item["foodName"] == foodName)[0]
          .item
      : null;
  };

  const insertFoodData = (): void => {
    const foodData = identifyFoodData();
    if (foodData == null || inputFoodWeightRef.current.value == "") return;
    else {
      const caledNutrition: Nutrition = {
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
        biotin: calNutrition(foodData["BIOT"], 1),
      };
      const food: Foodstuff = {
        id: foodstuff.id,
        name: foodName,
        weight: Number(inputFoodWeightRef.current.value),
        nutrition: caledNutrition,
      };
      props.updateFoodstuff(food);
      // localStorage.setItem(food.name, JSON.stringify(food));
      // return JSON.parse(localStorage.getItem(foodName)!);
    }
  };

  const calNutrition = (nutrition: string, decimalPoint: number): number => {
    return Number(
      (
        Number(nutrition) *
        (Number(inputFoodWeightRef.current.value) / 100)
      ).toFixed(decimalPoint)
    );
  };

  return (
    <form className="w-full">
      <div className="flex justify-around items-center border-b-2 border-yellow-700/50 py-2">
        <input
          ref={inputFoodNameRef}
          onChange={handleOnChangeFood}
          className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="食品名を入力して下さい"
          aria-label="Full name"
        />
        <input
          onBlur={insertFoodData}
          min={0}
          type="number"
          className="border text-sm w-10 ml-1 rounded text-right"
          ref={inputFoodWeightRef}
        />
        g
        <button
          onClick={() => {
            props.removeFoodstuff(props.index);
          }}
          className="flex-shrink-0 bg-orange-500 hover:bg-orange-500 border-orange-500 hover:border-orange-500 text-md border-4 text-white py-1 px-2 ml-2 rounded shadow-md"
          type="button"
        >
          <FaTrashAlt />
        </button>
        <button
          className="flex-shrink-0 hover:border-white border-white text-md border-4 text-orange-500 py-1 bg-white px-2 ml-2 rounded shadow-md"
          onClick={() => {
            openModal("nutritonList");
          }}
        >
          {" "}
          <BsFillFileEarmarkTextFill />
        </button>
        <Modal />
        {/* 栄養素がモーダルウインドで表示される予定ですが、今はlocalStorageからデータを持ってくるだけです。 */}
      </div>
      {searchCandidates.length ? (
        <select
          onChange={handleOnChangeSuggest}
          className="inline bg-white border border-gray-400 hover:border-gray-500 w-full mt-1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">食品を選択してください</option>
          {searchCandidates.map((food) => (
            <option
              onClick={insertFoodData}
              key={food.item.foodCode}
              value={food.item.foodName}
            >
              {food.item.foodName}
            </option>
          ))}
        </select>
      ) : null}
    </form>
  );
};
