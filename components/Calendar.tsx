import React, { useState } from "react"
export function Modal() {
  const [selectedDate,setDate] = useState([]);
  
  return (
    <div className="flex justify-center items-center bg-fixed  top-0 left-0 ">
    <div className="bg-orange-50  rounded-lg  shadow-md  p-5 sm:p-10">
      </div>
    </div>

  )
}