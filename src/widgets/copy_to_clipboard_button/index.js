import React, { useCallback, useState } from "react";
import { sleep } from "../../libs/sleep";
import * as style from "./style.css";

export const CopyToClipboardButton = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    await sleep(2000);
    setCopied(false);
  }, [value]);

  return (
    <button
      type="button"
      className={style.copy}
      title="Copy to clipboard"
      onClick={handleCopy}
    >
      {copied ? "\u{1f5f8}" : "\u{1f4cb}"}
    </button>
  );
};
