import { foodList } from "../json/foodList"
import Fuse from "fuse.js"
import { NextPage } from "next";
import React,{ useRef, useState } from "react";

 const InputFood :NextPage = () => {
  const options = {
    threshold: 0.1,
    keys: [
      "food-name",
    ]
  };
  let fuse = new Fuse(foodList,options);
  const inputElement = useRef(null)

    let result = fuse.search("");

  const handleOnClick = () => {
    if(inputElement.current != null){
      result = fuse.search(inputElement.current.value);
      console.log(result)
    }
  }

  return(
    <div>
      <input className="bg-red-300" type="text" ref={inputElement} />
      <button onClick={handleOnClick}>検索</button>
    <ul>
      
    {
    result.map((food)=>
      <li>
        <button>{food.item["food-name"]}</button>
      </li>
    )}
    </ul>
    </div>
   
  )
  
};
export default InputFood;