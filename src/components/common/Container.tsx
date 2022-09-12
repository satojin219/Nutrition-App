import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuthenticate } from "../../hooks/useAuthenicate";
import { useModal } from "../../hooks/useModal";

type Props = {
  children: ReactNode;
};

export const Container: React.VFC<Props> = (props) => {
  const { modal } = useModal();
  const { user } = useAuthenticate();
  const router = useRouter();
  const fixedClassNames = {
    "fixed w-full": modal.isOpen,
  };

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  return (
    <div className={classNames(fixedClassNames)}>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {props.children}
    </div>
  );
};
