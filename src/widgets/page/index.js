import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import * as style from "./style.css";

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

export const ToolbarLink = ({ to, children }) => (
  <Link className={style.link} to={to}>
    {children}
  </Link>
);

export const ToolbarButton = ({ title, onClick, param, children }) => {
  const handleClick = useCallback(
    (event) => {
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
