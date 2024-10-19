import React, { useCallback, useState } from "react";
import { CopyToClipboardButton } from "../../widgets/copy_to_clipboard_button";
import * as style from "./style.css";

const EntryField = ({ label, value }) => {
  return (
    <div className={style.row}>
      <div className={style.name}>{label}</div>
      <div className={style.value}>
        <div className={style.content}>{value}</div>
        <CopyToClipboardButton value={value} />
      </div>
    </div>
  );
};

const visibleField = (name) => !["children", "type", "id"].includes(name);

const tidyLabel = (label) => label.replace(/^(generic-)/, "");

export const EntryView = ({ entry }) => {
  const fields = entry ? Object.keys(entry).filter(visibleField) : [];
  return (
    <div className={style.entryView}>
      {fields.map((field) => (
        <EntryField key={field} label={tidyLabel(field)} value={entry[field]} />
      ))}
    </div>
  );
};
