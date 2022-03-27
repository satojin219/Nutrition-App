import React, { useRef } from "react";

type Props = {
  content: string | undefined;
  index: number;
  //addRecipe(index: number): void;
  //removeRecipe(index: number): void;
  writeRecipe(index: number, value: string): void;
};
export const Recipe: React.VFC<Props> = (props) => {
  const inputRecipe = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="my-3">
      <div className="flex border-b-2">
        <div className="bg-primary text-base-white p-1 rounded-full text-sm shadow-md w-7 h-7 ml-1">
          <p className="text-center">{props.index + 1}</p>
        </div>
        {/* <button
          onClick={() => {
            props.addRecipe(props.index);
          }}
          className="bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7 ml-1"
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
        ) : null} */}
        <textarea
          ref={inputRecipe}
          onBlur={() => {
            props.writeRecipe(props.index, inputRecipe?.current?.value ?? "");
          }}
          className="text-md appearance-none bg-transparent border-none w-full py-1 px-2 focus:outline-none"
          aria-label="Full name"
          rows={4}
        />
        <hr />
      </div>
    </div>
  );
};
