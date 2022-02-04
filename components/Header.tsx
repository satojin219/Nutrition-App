
import React, { useState } from 'react'
import { UserData } from 'globalType'
import {FaCalendarAlt,FaAngleLeft, FaAngleRight} from 'react-icons/fa'

export const Header :React.VFC = () => {

  return (
    <div>
      <header className="bg-orange-500">
        <div className="flex justify-around text-white font-bold py-5">
          <div></div>
          <div className="flex items-center  font-bold text-3xl ">
            <button className='cursor-pointer mr-2 font-bold'><FaAngleLeft/></button>
            <h1 className='text-2xl'> 2022 / 01 / 22 (土) </h1>
            <button className=' ml-2 font-bold'><FaAngleRight/></button>
          </div>
          <button>
          <FaCalendarAlt size={40}/>
          </button>
        </div>
      </header>

    </div>
  )
}