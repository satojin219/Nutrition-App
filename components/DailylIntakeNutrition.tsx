import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faTint } from '@fortawesome/free-solid-svg-icons'
import { faFish } from '@fortawesome/free-solid-svg-icons'
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons'

import { FaFire,FaBreadSlice,FaFish } from 'react-icons/fa'
import { IoWater } from 'react-icons/io5'

export const DailylIntakeNutrition: React.VFC =(props) => {
  return (
    <div>
      <div className="rounded-b-3xl bg-orange-50  font-bold py-5 shadow-lg sm:text-xl">
        <div className="flex justify-around text-center ">
          <div>
            <div className='text-green-400 items-center flex'>
              <FaFire className='mr-1'/>
              <p>カロリー</p>
            </div>
            <p>2400 kcal</p>
          </div>

          <div>
            <div className='text-pink-400 items-center flex'>
              <FaBreadSlice className='mr-1'/>
              <p>炭水化物</p>
            </div>
            <p>83 g</p>
          </div>

          <div>
            <div className='text-red-600 items-center flex'>
              <FaFish className='mr-1'/>
              <p>たんぱく質</p>
            </div>
            <p>57 g</p>
          </div>

          <div>
            <div className='text-yellow-400 items-center flex'>
              <IoWater className='mr-1'/>
              <p>脂質</p>
            </div>
            <p>28 g</p>
          </div>

        </div>

        <div className="flex justify-end">
          <button className='sm:text-md mt-3 mr-5 pr-5 text-md font-bold'> 詳しく見る <span className="text-red-500">&gt;</span></button>
        </div>
      </div>
  
  

    </div>


  )
}