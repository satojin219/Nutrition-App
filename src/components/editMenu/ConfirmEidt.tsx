import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAuthenticate } from "../../hooks/useAuthenicate";
import { useModal } from "../../hooks/useModal";
import { currentDateState } from "../../states/currentDateState";
import { isEditedState } from "../../states/isEditedState";
import { mealTimeState } from "../../states/MealTimeState";

export const ConfirmEdit: React.VFC = () => {
  const { closeModal } = useModal();
  const mealTime = useRecoilValue(mealTimeState);
  const { user } = useAuthenticate();
  const currentDate = useRecoilValue(currentDateState);
  const setIsEdited = useSetRecoilState(isEditedState);

  return (
    <div className="rounded-md border-2 border-orange-500 mt-10 sm:mx-20 p-5 bg-white">
      <p>変更を保存せずに戻りますか？</p>
      <div className="mt-5 flex justify-center">
        <Link href={`/${user?.uid}/${currentDate}/${mealTime}`}>
          <a
            onClick={() => {
              closeModal();
              setIsEdited(false);
            }}
            className="text-center rounded-md  px-6 py-2 text-white bg-orange-500"
          >
            戻る
          </a>
        </Link>
      </div>
    </div>
  );
};
