import React, { useRef } from "react";

type Props = {
  content: string | undefined;
  index: number;
  addRecipe(index: number): void;
  removeRecipe(index: number): void;
  writeRecipe(index: number, value: string): void;
};
export const Recipe: React.VFC<Props> = (props) => {
  const inputRecipe = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="my-3">
      <div className="flex  group">
        <div className="duration-500 group-hover:mr-2 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7">
          <p className="text-center">{props.index + 1}</p>
        </div>
        <button
          onClick={() => {
            props.addRecipe(props.index);
          }}
          className="duration-500 group-hover:opacity-100 group-hover:mr-2 opacity-0 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7"
        >
          <span className="inline-block text-center font-bold ml-0.5">＋</span>
        </button>
        {props.index != 0 ? (
          <button
            onClick={() => {
              props.removeRecipe(props.index);
            }}
            className="duration-500 group-hover:opacity-100 group-hover:mr-2  opacity-0 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7"
          >
            <span className="inline-block text-center font-bold ml-0.5">
              －
            </span>
          </button>
        ) : null}
      </div>
      <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
        <textarea
          ref={inputRecipe}
          onBlur={() => {
            props.writeRecipe(props.index, inputRecipe?.current?.value ?? "");
          }}
          className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3   py-1 px-2 leading-tight focus:outline-none"
          aria-label="Full name"
          rows={4}
        />
      </div>
    </div>
  );
};
