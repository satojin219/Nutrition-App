import React from "react";
import { RecipeType } from "../../shared/globalType";

type Props = {
  recipe: RecipeType;
  index: number;
};
export const Recipe: React.VFC<Props> = (props) => {
  return (
    <div className="my-3">
      <div className="flex group">
        <div className="duration-500 group-hover:mr-2 text-left bg-orange-500 text-white p-1 rounded-full text-sm shadow-md w-7">
          <p className="text-center">{props.index + 1}</p>
        </div>
      </div>
      <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
        <textarea
          disabled
          className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          aria-label="Full name"
          rows={4}
          value={props.recipe.content}
        />
      </div>
    </div>
  );
};
