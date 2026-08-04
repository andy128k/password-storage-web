import React from "react";
import { Link } from "react-router-dom";
import * as style from "./style.module.css";

export const FileLink = ({ file }) => (
  <Link className={style.link} to={`/file/${file.id}`}>
    {file.filename}
  </Link>
);
