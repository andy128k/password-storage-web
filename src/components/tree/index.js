import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as style from "./style.css";

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_HOME = 36;
const KEY_END = 35;

const Node = ({ file, entry, level, index, onSetRef, onKeyDown }) => {
  const handleRef = useCallback(
    (node) => {
      onSetRef(node, index);
    },
    [index, onSetRef],
  );

  const keyDown = useCallback(
    (event) => {
      const { keyCode } = event;
      if ([KEY_UP, KEY_DOWN, KEY_HOME, KEY_END].includes(keyCode)) {
        event.preventDefault();
        event.stopPropagation();
        onKeyDown(keyCode, index, entry);
      } else {
        console.log(keyCode);
      }
    },
    [index, entry, onKeyDown],
  );

  return (
    <div
      className={style.nodeRow}
      style={{ paddingLeft: level * 40 + 5 }}
      onKeyDown={keyDown}
    >
      <Link to={`/file/${file.id}/entry/${entry.id}`} ref={handleRef}>
        {entry.name}
      </Link>
    </div>
  );
};

function flattenEntries(entries) {
  function traverse(entries, level, result) {
    for (const entry of entries) {
      result.push({ entry, level });
      if (entry?.children?.length) {
        traverse(entry.children, level + 1, result);
      }
    }
  }

  const result = [];
  traverse(entries, 0, result);
  return result;
}

export const Tree = ({ entries, file }) => {
  const nodes = useRef([]);
  const setNodeRef = useCallback((node, index) => {
    nodes.current[index] = node;
  }, []);

  const keyDown = useCallback((keyCode, index) => {
    const n = nodes.current;
    if (keyCode === KEY_UP) {
      n?.[index - 1]?.focus();
    } else if (keyCode === KEY_DOWN) {
      n?.[index + 1]?.focus();
    } else if (keyCode === KEY_HOME) {
      n?.[0]?.focus();
    } else if (keyCode === KEY_END) {
      n?.[n.length - 1]?.focus();
    }
  }, []);
  useEffect(() => {
    nodes?.[0]?.focus();
  }, []);

  return (
    <div className={style.tree} onKeyDown={keyDown}>
      {flattenEntries(entries).map(({ entry, level }, index) => (
        <Node
          key={entry.id}
          file={file}
          entry={entry}
          level={level}
          index={index}
          onSetRef={setNodeRef}
          onKeyDown={keyDown}
        />
      ))}
    </div>
  );
};
