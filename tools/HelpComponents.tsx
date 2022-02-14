import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { MdFastfood } from "react-icons/md";

export const divideIconAndColor = (
  whenMeal: string
): { headerIcon: JSX.Element } => {
  switch (whenMeal) {
    case "breakfast": {
      return {
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
        headerIcon: <div></div>,
      };
    }
  }
};
