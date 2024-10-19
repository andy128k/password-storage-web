import React, { useCallback, useId } from "react";
import * as style from "./style.css";

export const Search = ({ value, onChange }) => {
  const id = useId();

  const handleChanged = useCallback(
    (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  const handleReset = useCallback(
    (event) => {
      event.preventDefault();
      if (onChange) {
        onChange("");
      }
    },
    [onChange],
  );

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={id}>
        {"\u{1f50e}"}
      </label>
      <input
        className={style.entry}
        value={value}
        onChange={handleChanged}
        id={id}
      />
      <button
        className={style.reset}
        title="Reset search"
        onClick={handleReset}
      >
        {"\u{2a2f}"}
      </button>
    </div>
  );
};
