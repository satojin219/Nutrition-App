import React from 'react'
import { useState } from 'react'
import { SuggestFood } from './SuggestFood'
import { NutritionList } from './NutritionList'
import { Recipe } from './Recipe'
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { RiMoneyCnyCircleLine } from 'react-icons/ri'
import { Menu, RecipeType, Foodstuff,Nutrition } from 'globalType'
import { useRef } from 'react'
import { useEffect } from 'react'
import { addElement, removeElemnt } from '../tools/HelpMethods'


type Props = {
  index: number,
  menu: Menu,
  removeMenuCard(id: number): void
}

export const EditMenuCard: React.VFC<Props> = (props) => {
  let menuData = props.menu;
  const recipeName = useRef(null);
  const cost = useRef(null);
  const time = useRef(null);
  const tips = useRef(null);
  const [foodstuffs, setFoodstuff] = useState<Foodstuff[]>([]);
  const [recipes, setRecipe] = useState<RecipeType[]>([]);
  let copyFoodstuffs = [...foodstuffs];
  
  const addFoodstuff = () => {
    addElement(foodstuffs,setFoodstuff);
    // copyFoodstuffs.push({ id: copyFoodstuffs.length + 1 });
    // setFoodstuff(copyFoodstuffs);
  }
  const removeFoodstuff = (index: number) => {
    removeElemnt(foodstuffs, setFoodstuff,index);
    // copyFoodstuffs.splice(index, 1);
    // setFoodstuff(copyFoodstuffs);
  }
  const addRecipe = (index:number) =>{
    addElement(recipes, setRecipe, index);

    // let copyRecipes = [...recipes];
    // if (index == 0 || index == copyRecipes.length-1){
    //   copyRecipes.push({ id: Math.random() });
    // }else{
    //   copyRecipes.splice(index,0,{ id: Math.random() });
    // }
    // setRecipe(copyRecipes);
  }
  const removeRecipe = (index:number) =>{
    removeElemnt(recipes, setRecipe, index);

    // let copyRecipes = [...recipes];
    // copyRecipes.splice(index,1);
    // console.log(copyRecipes)
    // setRecipe(copyRecipes);
  }
  const writeRecipe = (index:number,value:string) =>{
    let copyRecipes = [...recipes];
    copyRecipes[index].content = value;
    console.log(copyRecipes)
    setRecipe(copyRecipes);
  }
    useEffect(()=>{
    addRecipe(0);
    },[]);

  // ShowNutritionListに試しにpropsを渡す。ローカルストレージにあったものをコピペしたのでアルファベット順に慣れんでいますが、試作という事で今は目を瞑ってください
  const protNutritionList: Nutrition = {
    biotin: 2.7,
    ca: 5,
    calorie: 19,
    carbohydrates: 0.8,
    cr: 0,
    cu: 0.01,
    dietaryFiber: 0,
    fe: 0.2,
    folate: 5,
    i: 70,
    k: 17,
    lipids: 1.2,
    mg: 1,
    mn: 0,
    mo: 0,
    na: 59,
    niacin: 0.1,
    p: 20,
    pantothenicAcid: 0.13,
    protein: 1.4,
    salt: 0.2,
    se: 3,
    suger: 0.9,
    vitA: 18,
    vitB1: 0.01,
    vitB2: 0.16,
    vitB6: 0.01,
    vitB12: 0.1,
    vitC: 0,
    vitD: 0.3,
    vitE: 0.1,
    vitK: 1,
    zn: 0.1

  }

  return (
    <div className="flex justify-center my-10 lg:mx-5 sm:mx-20 mx-10">

      <div className="md:w-3/4 bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">
        <div className='mb-5'>
          <div className='flex justify-between'>
            <h1 className='text-left text-2xl'>料理名</h1>
            <button onClick={() => props.removeMenuCard(props.index)} className='hover:text-orange-700 opacity-50'><FaTrashAlt size={30} /></button>
          </div>
          <div className="text-right items-center border-b-2 border-yellow-700/50 py-2 sm:w-2/3 w-full">
            <input className="text-sm sm:text-xl appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="料理名を入力して下さい" aria-label="Full name" />
          </div>
        </div>

        <div className=" xl:flex flex-row justify-around">

          <div className="basis-1/3 md:basis-1/3 flex justify-center items-center bg-gray-400 text-white  h-48 text-xl">
            <img src="" alt="No Image" />
          </div>
          <div className="basis-2/3  my-0 mx-3 mt-5 xl:mt-0">
            <div className='flex justify-between mb-2'>
              <h2 className='text-left text-2xl'>材料 <span className='text-sm font-extralight text-red-500'> (1人分)</span></h2>

              <button onClick={addFoodstuff} className='active:scale-90 active:text-red-600 bg-orange-500 text-white text-center p-2 rounded-full text-sm shadow-md'>+ 食材を追加する</button>
            </div>

            {
              foodstuffs.map((foodstuff: Foodstuff, i: number) =>
                <SuggestFood key={i} foodstuff={foodstuff} />
              )
            }


          </div>
        </div>

        <div className='my-5'>
          <h3 className='text-left text-2xl mb-3'>作り方</h3>

          {
            recipes.map((recipe :RecipeType,index :number)=>
              <Recipe key={recipe.id} content={recipe.content} index={index} addRecipe={addRecipe} removeRecipe={removeRecipe} writeRecipe={writeRecipe}/>
            )
          }

        </div>

        <div className='my-5'>
          <h4 className='text-left text-2xl mb-3 flex items-center'><AiOutlineExclamationCircle size={30} /> コツ・ポイント</h4>
          <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
            <textarea className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" aria-label="Full name" />
          </div>
        </div>

        <div className='my-5'>
          <div className='flex justify-around'>
            <div className='flex items-center opacity-70'>
              <BiTimeFive />
              <p>調理時間:     <input min={0} type="number" className="border text-sm  w-10 ml-1 rounded text-right" /> 分</p>
            </div>
            <div className='flex items-center opacity-70'>
              <RiMoneyCnyCircleLine />
              <p>費用: <input min={0} type="number" className="border text-sm  w-10 ml-1 rounded text-right" /> 円</p>
            </div>
          </div>
        </div>

        <NutritionList nutrition={protNutritionList} />
      </div>
    </div>

  )
}
