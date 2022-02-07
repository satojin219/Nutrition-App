import React from 'react';
import { BsFillBrightnessAltHighFill, BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { MdFastfood } from 'react-icons/md'
import { NutritionList } from './NutritionList';
import { Nutrition } from 'globalType';

export const DishCard: React.VFC = (props) => {

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


export const DishCard: React.VFC = (props) => {
  return (
    <div className="lg:flex flex-wrap">
      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-red-500 rounded-t-lg text-white text-center p-5 text-3xl flex justify-center">
              <BsFillBrightnessAltHighFill size={40} className='mr-2' />
              <p>朝食</p>
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">
            <div className=" md:flex flex-row justify-around">
              <div className="basisi-1/2 md:basis-1/3 p-3">
                <img src="/sp_detail_main_PS_KCF_1585M.jpg" alt="" />
              </div>
              <ul className="basisi-1/2 md:text-xl list-disc p-3">
                <li className="border-yellow-700/50    border-b-2  my-2">ごはん</li>
                <li className="border-yellow-700/50 border-b-2  my-2">シイタケのお吸い物</li>
                <li className="border-yellow-700/50 border-b-2  my-2">みそ汁</li>
                <li className="border-yellow-700/50 border-b-2  my-2">さばの味噌煮</li>
              </ul>
            </div>
            <NutritionList nutrition={protNutritionList} />
          </div>

        </div>
      </div>
      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-yellow-400 rounded-t-lg text-white text-center p-5 text-3xl flex justify-center">
              <BsFillSunFill size={40} className='mr-2' />
              <p>昼食</p>
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10">
            <div className=" md:flex flex-row justify-around">

              <div className="basis-1/3 md:basis-1/3 flex justify-center items-center bg-gray-400 text-white  h-48 text-xl">
                <img src="" alt="No Image" />
              </div>

              <ul className="basisi-1/2 md:text-xl list-disc p-3">
                <li className="border-yellow-700/50    border-b-2  my-2">鶏そぼろのビビンバ</li>
                <li className="border-yellow-700/50 border-b-2  my-2">豆腐とわかめの中華スープ</li>

              </ul>
            </div>
            <NutritionList nutrition={protNutritionList} />
          </div>

        </div>

      </div>

      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-purple-500 rounded-t-lg text-white text-center p-5 text-3xl flex justify-center">
              <BsFillMoonFill size={40} className='mr-2' />
              <p>夕食</p>
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">
            <div className=" md:flex flex-row justify-around">
              <div className="basisi-1/2 md:basis-1/3">
                <img src="https://img.benesse-cms.jp/thank-you/item/image/normal/resized/resized_08f1f45c-19f5-40fd-bd13-50d13bf18a51.jpg" alt="" />
              </div>
              <ul className="basisi-1/2 md:text-xl list-disc p-3">
                <li className="border-yellow-700/50    border-b-2  my-2">ごはん</li>
                <li className="border-yellow-700/50 border-b-2  my-2">お麩の味噌汁</li>
                <li className="border-yellow-700/50 border-b-2  my-2">ハンバーグ</li>
                <li className="border-yellow-700/50 border-b-2  my-2">ポテトサラダ</li>
              </ul>
            </div>
            <NutritionList nutrition={protNutritionList} />
          </div>

        </div>

      </div>
      <div className="basis-1/2 ">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-sky-400 rounded-t-lg text-white text-center p-5 text-3xl flex justify-center">
              <MdFastfood size={40} className='mr-2' />
              <p>間食</p>
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">

            <div className="flex justify-center">
              <div className="bg-orange-500 text-white text-center p-2 rounded-full">
                <div>+ 献立を追加する</div>
              </div>
            </div>


          </div>

        </div>

      </div>



    </div>

  )
}