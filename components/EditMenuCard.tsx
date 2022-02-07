import React from 'react'
import { useState } from 'react'
import { SuggestFood } from './SuggestFood'
import { Recipe } from './Recipe'
import { FaTrashAlt } from 'react-icons/fa'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { RiMoneyCnyCircleLine } from 'react-icons/ri'
import { Menu } from 'globalType'
import { Foodstuff } from 'globalType'
import { useRef } from 'react'
import { useEffect } from 'react'


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
  const [recipes,setRecipe] = useState<string[]>([]);
  let copyFoodstuffs = [...foodstuffs];

  const addFoodstuff = () => {
    copyFoodstuffs.push({ id: copyFoodstuffs.length + 1 });
    setFoodstuff(copyFoodstuffs);
  }
  const removeFoodstuff = (index: number) => {
    copyFoodstuffs.splice(index, 1);
    setFoodstuff(copyFoodstuffs);
  }
  const addRecipe = (index:number) =>{
    let copyRecipes = [...recipes];

    copyRecipes.splice(index,0,"");
    console.log(copyRecipes);
    setRecipe(copyRecipes);
  }
  const removeRecipe = (index:number) =>{
    let copyRecipes = [...recipes];

    copyRecipes.splice(index,1);
    setRecipe(copyRecipes);
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
            recipes.map((recipe :string,index :number)=>
            <Recipe key={recipe} recipe={recipe} index={index} addRecipe={addRecipe} removeRecipe={removeRecipe}/>
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

        <div className="border-2 border-red-700 rounded mt-10 sms:mx-20 p-4  bg-white">
          <div className=" md:flex flex-row flex-wrap  ">
            <div className="basis-1/2">エネルギー: 620kcal</div>
            <div className="basis-1/2">炭水化物: 34g</div>
            <div className="basis-1/2">たんぱく質: 8g</div>
            <div className="basis-1/2">脂質: 13g</div>
            <div className="basis-1/2">食塩相当量: 2g</div>

          </div>
          <div className="flex justify-end">
            <button className='text-md font-bold'> 詳しく見る <span className="text-red-500">&gt;</span></button>
          </div>
        </div>
      </div>
    </div>

  )
}
