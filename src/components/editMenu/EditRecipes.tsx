import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RecipeType } from "../../shared/globalType";
import { editMenuState } from "../../states/EditMenuState";
import { addElement, removeElemnt } from "../../tools/HelpMethods";
import { EditRecipe } from "./EditRecipe";

type Props = {
  recipes?: RecipeType[];
};
export const EditRecipes: React.VFC<Props> = (props) => {
  const [recipes, setRecipe] = useState<RecipeType[]>(props.recipes ?? []);
  const [menuState, setMenuState] = useRecoilState(editMenuState);

  const addRecipe = useCallback(
    (index: number) => {
      addElement(props.recipes!, setRecipe, index);
    },
    [props.recipes]
  );
  const removeRecipe = (index: number) => {
    removeElemnt(props.recipes!, setRecipe, index);
  };
  const writeRecipe = (index: number, value: string) => {
    let copyRecipes = [...recipes];
    copyRecipes[index].content = value;
    setRecipe(copyRecipes);
  };

  useEffect(() => {
    if (!props.recipes || props.recipes?.length == 0) addRecipe(0);
    setMenuState({
      ...menuState,
      recipes: recipes,
    });
  }, [props.recipes, recipes]);

  return (
    <>
      {recipes!.map((recipe: RecipeType, index: number) => {
        return (
          <EditRecipe
            key={recipe.id}
            content={recipe.content}
            index={index}
            addRecipe={addRecipe}
            removeRecipe={removeRecipe}
            writeRecipe={writeRecipe}
          />
        );
      })}
    </>
  );
};
