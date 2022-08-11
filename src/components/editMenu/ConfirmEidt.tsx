import Link from "next/link";
import { useRouter } from "next/router";
import { useModal } from "../../hooks/useModal";

export const ConfirmEdit: React.VFC = () => {
  const { closeModal } = useModal();
  const router = useRouter();
  return (
    <div className="rounded-md border-2 border-orange-500 mt-10 sm:mx-20 p-5 bg-white">
      <p>変更を保存せずに戻りますか？</p>
      <div className="mt-5 flex justify-center">
        <Link
          href={`/${router.query.userId}/${router.query.currentDate as string}`}
        >
          <a
            onClick={closeModal}
            className="text-center rounded-md  px-6 py-2 text-white bg-orange-500"
          >
            戻る
          </a>
        </Link>
      </div>
    </div>
  );
};
