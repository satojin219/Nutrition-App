import React from 'react';
import { Menus } from 'globalType';

export const DishCard:React.VFC =(props)=> {
  return (
    <div className="lg:flex flex-wrap">
      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-red-500 rounded-t-lg text-white text-center p-5 text-3xl">
              朝食
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
      </div>
      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-yellow-400 rounded-t-lg text-white text-center p-5 text-3xl">
              昼食
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10">
            <div className=" md:flex flex-row justify-around">
              <div className="basisi-1/2 md:basis-1/3 flex justify-center items-center bg-gray-400 text-white  h-48">
                <div className=""></div>
                <img src="" alt="" />
                <div className="text-xl">No Image</div>
              </div>

              <ul className="basisi-1/2 md:text-xl list-disc p-3">
                <li className="border-yellow-700/50    border-b-2  my-2">鶏そぼろのビビンバ</li>
                <li className="border-yellow-700/50 border-b-2  my-2">豆腐とわかめの中華スープ</li>

              </ul>
            </div>

            <div className="border-2 border-red-700 rounded mt-10 sms:mx-20 p-4  bg-white">
              <div className=" md:flex flex-row flex-wrap">
                <div className="basis-1/2">エネルギー: 530kcal</div>
                <div className="basis-1/2">炭水化物: 24g</div>
                <div className="basis-1/2">たんぱく質: 5g</div>
                <div className="basis-1/2">脂質: 9g</div>
                <div className="basis-1/2">食塩相当量: 1.4g</div>

              </div>
              <div className="flex justify-end">
                <button className='text-md font-bold'> 詳しく見る <span className="text-red-500">&gt;</span></button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="basis-1/2">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-purple-500 rounded-t-lg text-white text-center p-5 text-3xl">
              夕食
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

            <div className="border-2 border-red-700 rounded mt-10 sms:mx-20 p-4  bg-white">
              <div className=" md:flex flex-row flex-wrap">
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

      </div>
      <div className="basis-1/2 ">
        <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-sky-400 rounded-t-lg text-white text-center p-5 text-3xl">
              間食
            </div>
          </div>
          <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">

            <div className="flex justify-center">
              <div className="bg-orange-500 text-white text-center p-2 rounded-full w-full">
                <div>+ 献立を追加する</div>
              </div>
            </div>


          </div>

        </div>

      </div>



    </div>

  )
}