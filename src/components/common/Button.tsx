import React from "react";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  queryName?: string;
  query?: string;
};

export const Button: React.FC<Props> = ({
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={classNames(
        className,
        "flex items-center justify-center w-full h-10 rounded-md"
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const LinkButton: React.FC<Props> = ({
  className,
  children,
  href,
  queryName,
  query,
}) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center w-full h-10 rounded-md"
      )}
    >
      <Link href={{ pathname: href, query: { queryName: query } }}>
        {children}
      </Link>
    </div>
  );
};
