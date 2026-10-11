import { Link } from "@tanstack/react-router";
import * as style from "./style.module.css";

export const FileLink = ({ file }) => (
  <Link className={style.link} to="/file/$fileId" params={{ fileId: file.id }}>
    {file.filename}
  </Link>
);
