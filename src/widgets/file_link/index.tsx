import { Link } from "@tanstack/react-router";
import React from "react";
import * as style from "./style.module.css";

export const FileLink = ({ file }) => (
  <Link className={style.link} to="/file/$fileId" params={{ fileId: file.id }}>
    {file.filename}
  </Link>
);
