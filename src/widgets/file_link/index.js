import React from "react";
import { Link } from "react-router-dom";
import style from "./style.css";

export const FileLink = ({ file }) => (
  <Link className={style.link} to={`/file/${file.id}`}>
    {file.filename}
  </Link>
);
