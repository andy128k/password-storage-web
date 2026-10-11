import * as style from "./style.module.css";

export function ErrorPanel({ error }) {
  return error ? <div className={style.panel}>{error.toString()}</div> : null;
}
