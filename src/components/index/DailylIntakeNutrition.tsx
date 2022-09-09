import { Modal } from "../common/Modal";
import { FaFire, FaBreadSlice, FaFish } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { Nutrition } from "../../shared/globalType";
import { useModal } from "../../hooks/useModal";

type TotalNutrition = {
  totalNutrition: Nutrition;
};
export const DailylIntakeNutrition: React.VFC<TotalNutrition> = (props) => {
  const { openModal } = useModal();

  return (
    <div className="bg-white font-bold py-5 mb-3 shadow-lg sm:text-xl">
      <div className="flex justify-around text-center ">
        <div>
          <div className="text-green-400 items-center flex">
            <FaFire className="mr-1" />
            <p>カロリー</p>
          </div>
          <p>{props.totalNutrition.calorie} kcal</p>
        </div>

        <div>
          <div className="text-pink-400 items-center flex">
            <FaBreadSlice className="mr-1" />
            <p>炭水化物</p>
          </div>
          <p>{props.totalNutrition.carbohydrates} g</p>
        </div>

        <div>
          <div className="text-red-600 items-center flex">
            <FaFish className="mr-1" />
            <p>たんぱく質</p>
          </div>
          <p>{props.totalNutrition.protein} g</p>
        </div>

        <div>
          <div className="text-yellow-400 items-center flex">
            <IoWater className="mr-1" />
            <p>脂質</p>
          </div>
          <p>{props.totalNutrition.lipids} g</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="sm:text-md mt-3 mr-5 pr-5 text-md font-bold"
          onClick={() => {
            openModal("nutritonList");
          }}
        >
          詳しく見る <span className="text-red-500">&gt;</span>
        </button>
        <Modal nutrition={props.totalNutrition} />
      </div>
    </div>
  );
};
