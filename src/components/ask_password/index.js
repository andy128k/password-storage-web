import React, { useCallback, useState } from "react";
import { ErrorPanel } from "../../widgets/error_panel";
import { useId } from "../../hooks/useId";
import style from "./style.css";

export const AskPassword = ({ filename, error, onEnterPassword, onCancel }) => {
  const id = useId("password");
  const [password, setPassword] = useState("");

  const handleChange = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onEnterPassword(password);
      return false;
    },
    [password, onEnterPassword],
  );

  return (
    <div className={style.container}>
      <div className={style.title}>
        Opening <em>{filename}</em>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <ErrorPanel error={error} />

        <label className={style.label} htmlFor={id}>
          Enter password
        </label>
        <input
          className={style.input}
          type="password"
          value={password}
          onChange={handleChange}
          autoFocus
          autoComplete="off"
          id={id}
        />
        <div className={style.buttons}>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <input type="submit" value="OK" />
        </div>
      </form>
    </div>
  );
};
