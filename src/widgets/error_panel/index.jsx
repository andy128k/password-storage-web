import React from "react";
import * as style from "./style.css";

export function ErrorPanel({ error }) {
  return error ? <div className={style.panel}>{error.toString()}</div> : null;
}
