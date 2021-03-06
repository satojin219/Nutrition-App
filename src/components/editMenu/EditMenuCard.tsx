import React, { useCallback, useState, useContext } from "react";
import { SuggestFood } from "./SuggestFood";
import { NutritionList } from "../common/NutritionList";
import { Recipe } from "./Recipe";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import {
  Menu,
  RecipeType,
  Foodstuff,
  Nutrition,
} from "../../shared/globalType";
import { useRef } from "react";
import { useEffect } from "react";
import {
  addElement,
  removeElemnt,
  calSumNutritionFromFoodstuff,
} from "../../tools/HelpMethods";
import { dummyMenu } from "../../tools/dummyMenu";
import { FoodImage } from "./FoodImage";
import { IsEditedContext } from "../../pages/_app";

type Props = {
  index: number;
  menu: Menu;
  removeMenuCard(id: number): void;
  updateMenuCard(index: number, data: any, dataType: any): void;
};

export const EditMenuCard: React.VFC<Props> = (props) => {
  const { setIsEdited } = useContext(IsEditedContext);
  const recipeNameRef = useRef<HTMLInputElement>(null!);
  const costRef = useRef<HTMLInputElement>(null!);
  const timeRef = useRef<HTMLInputElement>(null!);
  const tipsRef = useRef<HTMLTextAreaElement>(null!);
  const [foodstuffs, setFoodstuff] = useState<Foodstuff[]>(
    props.menu.foodstuffs ?? []
  );
  const [recipes, setRecipe] = useState<RecipeType[]>(props.menu.recipes ?? []);
  const onImageChange = (imageUrl: string) => {
    // ここでmenuに差し込むと良さそう
    props.updateMenuCard(props.index, imageUrl, "imgUrl");
    setIsEdited(true);
    console.log("imageuUrl", imageUrl);
  };
  let totalNutrition: Nutrition | undefined =
    calSumNutritionFromFoodstuff(foodstuffs);

  const addFoodstuff = () => {
    addElement(foodstuffs, setFoodstuff);
  };
  const removeFoodstuff = (index: number) => {
    removeElemnt(foodstuffs, setFoodstuff, index);
  };
  const updateFoodstuff = (data: Foodstuff) => {
    let copyFoodstuffs = [...foodstuffs];
    copyFoodstuffs.map((copyFoodstuff: Foodstuff, index: number) => {
      if (copyFoodstuff.id == data.id) {
        copyFoodstuffs[index] = data;
      }
    });
    setFoodstuff(copyFoodstuffs);
    props.updateMenuCard(
      props.index,
      calSumNutritionFromFoodstuff(copyFoodstuffs) ??
        dummyMenu[0].totalNutrition,
      "totalNutrition"
    );
  };
  const addRecipe = useCallback(
    (index: number) => {
      addElement(recipes, setRecipe, index);
    },
    [props.menu, recipes]
  );
  const removeRecipe = (index: number) => {
    removeElemnt(recipes, setRecipe, index);
  };
  const writeRecipe = (index: number, value: string) => {
    let copyRecipes = [...recipes];
    copyRecipes[index].content = value;
    setRecipe(copyRecipes);
  };

  useEffect(() => {
    if (!props.menu.recipes || props.menu.recipes?.length == 0) addRecipe(0);
    if (!props.menu.foodstuffs || props.menu.foodstuffs.length == 0)
      addFoodstuff();
    recipeNameRef.current.value = props.menu.recipeName ?? "";
    costRef.current.value = props.menu.cost?.toString() ?? "";
    timeRef.current.value = props.menu.time?.toString() ?? "";
    tipsRef.current.value = props.menu.tips ?? "";
  }, []);

  useEffect(() => {
    props.updateMenuCard(props.index, recipes, "recipes");
  }, [recipes]);

  useEffect(() => {
    props.updateMenuCard(props.index, foodstuffs, "foodstuffs");
  }, [foodstuffs]);

  return (
    <div className="flex justify-center my-10 lg:mx-5 sm:mx-20 mx-10">
      <div className="md:w-3/4 bg-orange-50 rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-left text-2xl">料理名</h1>
            <button
              onClick={() => props.removeMenuCard(props.index)}
              className="hover:text-orange-700 opacity-50"
            >
              <FaTrashAlt size={30} />
            </button>
          </div>
          <div className="text-right items-center border-b-2 border-yellow-700/50 py-2 sm:w-2/3 w-full">
            <input
              ref={recipeNameRef}
              className="text-sm sm:text-xl appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="料理名を入力して下さい"
              aria-label="Full name"
              onBlur={() => {
                props.updateMenuCard(
                  props.index,
                  recipeNameRef?.current.value ?? "",
                  "recipeName"
                );
              }}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </div>
        </div>

        <div className="xl:flex flex-row justify-around">
          <FoodImage menu={props.menu} onImageUrlChange={onImageChange} />
          <div className="basis-2/3 my-0 mx-3 mt-5 xl:mt-0">
            <div className="flex justify-between mb-2">
              <h2 className="text-left text-2xl">
                材料{" "}
                <span className="text-sm font-extralight text-red-500">
                  {" "}
                  (1人分)
                </span>
              </h2>

              <button
                onClick={addFoodstuff}
                className="active:scale-90 active:text-red-600 bg-orange-500 text-white text-center p-2 rounded-full text-sm shadow-md"
              >
                + 食材を追加する
              </button>
            </div>

            {foodstuffs.map((foodstuff: Foodstuff, index: number) => (
              <SuggestFood
                key={foodstuff.id}
                foodstuff={foodstuff}
                index={index}
                removeFoodstuff={removeFoodstuff}
                updateFoodstuff={updateFoodstuff}
              />
            ))}
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-left text-2xl mb-3">作り方</h3>

          {recipes.map((recipe: RecipeType, index: number) => (
            <Recipe
              key={recipe.id}
              content={recipe.content}
              index={index}
              addRecipe={addRecipe}
              removeRecipe={removeRecipe}
              writeRecipe={writeRecipe}
            />
          ))}
        </div>

        <div className="my-5">
          <h4 className="text-left text-2xl mb-3 flex items-center">
            <AiOutlineExclamationCircle size={30} /> コツ・ポイント
          </h4>
          <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
            <textarea
              ref={tipsRef}
              className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              aria-label="Full name"
              onBlur={() => {
                props.updateMenuCard(
                  props.index,
                  tipsRef?.current.value ?? "",
                  "tips"
                );
              }}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </div>
        </div>

        <div className="my-5">
          <div className="flex justify-around">
            <div className="flex items-center opacity-70">
              <BiTimeFive />
              <p>
                調理時間:{" "}
                <input
                  ref={timeRef}
                  min={0}
                  type="number"
                  className="border text-sm w-10 ml-1 rounded text-right"
                  onBlur={() => {
                    props.updateMenuCard(
                      props.index,
                      timeRef?.current.value ?? "",
                      "time"
                    );
                  }}
                  onChange={() => {
                    setIsEdited(true);
                  }}
                />{" "}
                分
              </p>
            </div>
            <div className="flex items-center opacity-70">
              <RiMoneyCnyCircleLine />
              <p>
                費用:{" "}
                <input
                  ref={costRef}
                  min={0}
                  type="number"
                  className="border text-sm  w-10 ml-1 rounded text-right"
                  onBlur={() => {
                    props.updateMenuCard(
                      props.index,
                      costRef?.current.value ?? "",
                      "cost"
                    );
                  }}
                  onChange={() => {
                    setIsEdited(true);
                  }}
                />{" "}
                円
              </p>
            </div>
          </div>
        </div>

        <NutritionList nutrition={totalNutrition} />
      </div>
    </div>
  );
};
