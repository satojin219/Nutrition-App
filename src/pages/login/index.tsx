import type { NextPage } from "next";
import Head from "next/head";
import { app } from "../../server/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <div className="bg-orange-500 flex justify-center items-center h-screen flex-col">
        <h1 className="text-3xl text-white mb-10">Nutrition App</h1>
        <form className="bg-white p-5 rounded-md w-1/2">
          <div className="flex flex-col my-3">
            <label>メールアドレス</label>
            <input
              className="border-yellow-700/50 border-b-2 my-2"
              name="email"
              type="email"
              placeholder=""
              required
            />
          </div>
          <div className="flex flex-col my-3">
            <label>パスワード</label>
            <input
              className="border-yellow-700/50 border-b-2 my-2"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <div className="flex justify-end">
              <p className="text-xs">
                <a className="text-blue-400">新規登録</a>はこちらから
              </p>
            </div>
            <div className="flex justify-center ">
              <button className="my-3 w-full bg-orange-500 text-white px-3 py-2 rounded-md">
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
