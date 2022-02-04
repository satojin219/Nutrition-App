import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { UserData } from 'globalType'
import { faCalendarAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { BsFillBrightnessAltHighFill } from 'react-icons/bs'
import { RiArrowGoBackFill } from 'react-icons/ri'
export const BreakfastHeader: React.VFC = () => {

  return (
    <div>

      <header className="bg-red-500">
        <div className="flex justify-around text-white font-bold py-5">
          <div className="   text-3xl flex">
            <BsFillBrightnessAltHighFill size={40} className='mr-2' />
            <p>朝食</p>
          </div>

          <div className="flex items-center  font-bold text-3xl ">
            <h1 className='text-2xl'> 2022 / 01 / 22 (土) </h1>
          </div>

          <button><RiArrowGoBackFill size={40}/></button>

        </div>
      </header>

    </div>
  )
}