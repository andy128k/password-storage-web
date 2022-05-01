import React, { useCallback, useState } from "react";
import { sleep } from "../../libs/sleep";
import style from "./style.css";

const EntryField = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    await sleep(2000);
    setCopied(false);
  }, [value]);

  return (
    <div className={style.row}>
      <div className={style.name}>{label}</div>
      <div className={style.value}>
        <div className={style.content}>{value}</div>
        <span className={style.copy} onClick={handleCopy}>
          {copied ? "\u{1f5f8}" : "\u{1f4cb}"}
        </span>
      </div>
    </div>
  );
};

const visibleField = (name) => !["children", "type", "id"].includes(name);

export const EntryView = ({ entry }) => {
  const fields = entry ? Object.keys(entry).filter(visibleField) : [];
  return (
    <div className={style.entryView}>
      {fields.map((field) => (
        <EntryField key={field} label={field} value={entry[field]} />
      ))}
    </div>
  );
};
