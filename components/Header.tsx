import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { UserData } from 'globalType'


export const Header :React.VFC = () => {

  return (
    <div>
      <header className="bg-orange-500">
        <div className="flex justify-around text-white font-bold py-5">
          <div></div>
          <div className="flex items-center  font-bold text-3xl ">
            <button className='cursor-pointer mr-2 font-bold'>&lt;</button>
            <h1 className='text-2xl'> 2022 / 01 / 22 (土) </h1>
            <button className=' ml-2    font-bold'>&gt;</button>
          </div>
          <div></div>
        </div>
      </header>

    </div>
  )
}