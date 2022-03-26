import React from "react";
import { useState } from "react";
import Image from "next/image";
import { LinkButton, Button } from "../components/common/Button";
import { SuggestFood } from "../components/editMenu/SuggestFood";
import { Header } from "../components/common/Header";
import { Recipe } from "../components/editMenu/Recipe";
import { Menu, RecipeType, Foodstuff, Nutrition } from "../shared/globalType";
import { useRef } from "react";
import { useEffect } from "react";
import { addElement, removeElemnt } from "../tools/HelpMethods";
import { useRouter } from "next/router";
type Props = {
  index: number;
  menu: Menu;
  removeMenuCard(id: number): void;
};

const Edit: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  let menuData = props.menu;
  const recipeName = useRef<HTMLInputElement>(null);
  const cost = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);
  const tips = useRef<HTMLInputElement>(null);
  const [foodstuffs, setFoodstuff] = useState<Foodstuff[]>([]);
  const [recipes, setRecipe] = useState<RecipeType[]>([]);
  //let totalNutrition: Nutrition | undefined = calSumNutrition(foodstuffs);

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
  };
  const addRecipe = (index: number) => {
    addElement(recipes, setRecipe, index);
  };
  const removeRecipe = (index: number) => {
    removeElemnt(recipes, setRecipe, index);
  };
  const writeRecipe = (index: number, value: string) => {
    let copyRecipes = [...recipes];
    copyRecipes[index].content = value;
    setRecipe(copyRecipes);
  };

  useEffect(() => {
    if (recipes.length === 0) {
      addRecipe(0);
    }
    if (foodstuffs.length === 0) {
      addFoodstuff();
    }
  }, []);

  return (
    <>
      {router.isReady && <Header isEdit={true} />}
      <section>
        <Image
          src={"/20180308-futako01-2.jpg"}
          alt="no image"
          height={280}
          width={380}
          objectFit={"cover"}
        />
        <Button
          className="bg-base-dark text-base-white border-2 border-base-white mx-2"
          // onClick={}
          disabled={false}
        >
          写真をアップロードする
        </Button>
      </section>
      <section className="mt-4">
        <p className="text-xl ml-2">料理名</p>
        <input
          type="text"
          placeholder="料理名"
          className="rounded w-full h-10 pl-4 text-base border-2"
        />
        {/* <button
          onClick={() => props.removeMenuCard(props.index)}
          className="hover:text-orange-700 opacity-50"
        >
          <FaTrashAlt size={30} />
        </button> */}
      </section>

      {/* <div className="xl:flex flex-row justify-around">
        <FoodImage />
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
      </div> */}
      <section>
        <p className="mt-4">食材リスト（1人前）</p>
        <ul>
          {foodstuffs.map((foodstuff: Foodstuff, index: number) => (
            <SuggestFood
              key={foodstuff.id}
              foodstuff={foodstuff}
              index={index}
              removeFoodstuff={removeFoodstuff}
              updateFoodstuff={updateFoodstuff}
            />
          ))}
          {/* <li className="text-sm border-2 rounded-md p-1 my-1">
            大根　1/6本（200g）
          </li>
          <li className="text-sm border-2 rounded-md p-1 my-1">
            大根　1/6本（200g）
          </li>
          <li className="text-sm border-2 rounded-md p-1 my-1">
            大根　1/6本（200g）
          </li>
          <li className="text-sm border-2 rounded-md p-1 my-1">
            大根　1/6本（200g）
          </li> */}
        </ul>
        <Button
          className="bg-secondary text-base-white my-4"
          onClick={addFoodstuff}
          disabled={false}
        >
          食材を追加する
        </Button>
      </section>
      <section>
        <p className="mt-4">レシピ</p>
        {recipes.map((recipe: RecipeType, index: number) => (
          <Recipe
            key={recipe.id}
            content={recipe.content}
            index={index}
            // addRecipe={addRecipe}
            // removeRecipe={removeRecipe}
            writeRecipe={writeRecipe}
          />
        ))}
        <Button
          className="bg-secondary text-base-white my-4"
          onClick={() => addRecipe(recipes.length)}
          disabled={false}
        >
          レシピを追加する
        </Button>
      </section>
      <section className="flex justify-around">
        <div>
          <p>調理時間</p>
          <input
            disabled
            type="text"
            value={"15分"}
            className="border-2 rounded-sm p-1"
            size={15}
          />
        </div>
        <div>
          <p>費用</p>
          <input
            disabled
            type="text"
            value={"1500"}
            className="border-2 rounded-sm p-1"
            size={15}
          />
        </div>
      </section>
      <LinkButton
        className="text-primary border-2 border-primary my-4"
        query=""
        queryName=""
        href="/"
      >
        料理の編集を完了する
      </LinkButton>

      {/* <div className="my-5">
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
            ref={tips}
            className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            aria-label="Full name"
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
                ref={time}
                min={0}
                type="number"
                className="border text-sm w-10 ml-1 rounded text-right"
              />{" "}
              分
            </p>
          </div>
          <div className="flex items-center opacity-70">
            <RiMoneyCnyCircleLine />
            <p>
              費用:{" "}
              <input
                ref={cost}
                min={0}
                type="number"
                className="border text-sm  w-10 ml-1 rounded text-right"
              />{" "}
              円
            </p>
          </div>
        </div>
      </div>

      <NutritionList nutrition={totalNutriton} /> */}
    </>
  );
};

export default Edit;
