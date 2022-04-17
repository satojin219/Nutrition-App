import type { NextPage } from "next";
import Head from "next/head";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../client/firebase";
import React, { useRef } from "react";

const SignUp: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current!.value,
      passwordRef.current!.value
    );
  };
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
              ref={emailRef}
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
              ref={passwordRef}
              className="border-yellow-700/50 border-b-2 my-2"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <div className="flex justify-end">
              <p className="text-xs">
                <a className="text-blue-400">ログイン</a>はこちらから
              </p>
            </div>
            <div className="flex justify-center ">
              <button
                onClick={handleSubmit}
                className="my-3 w-full bg-orange-500 text-white px-3 py-2 rounded-md"
              >
                登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
