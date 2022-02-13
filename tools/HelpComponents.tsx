import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { MdFastfood } from "react-icons/md";

export const divideIconAndColor = (
  whenMeal: string
): { headerIcon: JSX.Element; headerColor: string } => {
  switch (whenMeal) {
    case "breakfast": {
      return {
        headerColor: "bg-red-500",
        headerIcon: (
          <div className="text-3xl flex">
            <BsFillBrightnessAltHighFill size={40} className="mr-2" />
            <p>朝食</p>
          </div>
        ),
      };
    }
    case "lunch": {
      return {
        headerColor: "bg-yellow-400",
        headerIcon: (
          <div className="text-3xl flex">
            <BsFillSunFill size={40} className="mr-2" />
            <p>昼食</p>
          </div>
        ),
      };
    }
    case "dinner": {
      return {
        headerColor: "bg-purple-500",
        headerIcon: (
          <div className="text-3xl flex">
            <BsFillMoonFill size={40} className="mr-2" />
            <p>夕食</p>
          </div>
        ),
      };
    }
    case "snack": {
      return {
        headerColor: "bg-sky-400",
        headerIcon: (
          <div className="text-3xl flex">
            <MdFastfood size={40} className="mr-2" />
            <p>間食</p>
          </div>
        ),
      };
    }
    default: {
      return {
        headerColor: "bg-orange-500",
        headerIcon: <div></div>,
      };
    }
  }
};
