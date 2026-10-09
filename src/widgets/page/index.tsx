import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import React, { useCallback } from "react";
import * as style from "./style.module.css";

export const Page = ({ header, children }) => (
  <div className={style.page}>
    <div className={style.header}>
      <h1 className={style.title}>
        <Link to="/" className={classNames(style.titleLink, style.long)}>
          Password Storage
        </Link>
        <Link to="/" className={classNames(style.titleLink, style.short)}>
          PS
        </Link>
      </h1>
      <div className={style.expander} />
      {header}
    </div>
    <div className={style.content}>{children}</div>
  </div>
);

export const ToolbarLink = ({ to, params, children }) => (
  <Link className={style.link} to={to} params={params}>
    {children}
  </Link>
);

export const ToolbarButton = ({ title, onClick, param, children }) => {
  const handleClick = useCallback(
    (_event) => {
      onClick(param);
    },
    [onClick, param],
  );

  return (
    <button
      type="button"
      className={style.button}
      title={title}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
