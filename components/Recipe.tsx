import React from "react";
import { useEffect } from "react"

type Props = {
  recipe :string,
  index :number,
  addRecipe(index :number):void,
  removeRecipe(index :number):void

}
export const Recipe: React.VFC<Props> = (props) => {
  useEffect(()=>{
    props.addRecipe(props.index);
  },[]);

  return (
      <div className="my-3">
        <div className='flex  group'>

          <div className='duration-500 group-hover:mr-2 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7'>
            <p className='text-center'>1</p>
          </div>
          <button onClick={()=>{props.addRecipe(props.index)}} className=' duration-500 group-hover:opacity-100  group-hover:mr-2 opacity-0  text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7'>
            <span className='inline-block text-center font-bold ml-0.5'>＋</span>
          </button>
        <button onClick={() => { props.removeRecipe(props.index) }} className=' duration-500 group-hover:opacity-100 group-hover:mr-2  opacity-0 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7'>
            <span className='inline-block text-center font-bold ml-0.5'>－</span>
          </button>
        </div>
        <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
          <textarea  className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 mb-5  py-1 px-2 leading-tight focus:outline-none" aria-label="Full name" />
        </div>
      </div>


  )
}