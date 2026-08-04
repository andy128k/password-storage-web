import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFile } from "../../contexts/content";
import { Page, ToolbarLink } from "../../widgets/page";
import { Search } from "../search";
import { Tree } from "../tree";

function satisfies(query) {
  const queryLC = query.toLowerCase();
  return (entry) =>
    Object.entries(entry)
      .filter(([key, _value]) => key !== "id" && key !== "children")
      .some(([_key, value]) => value.toLowerCase().includes(queryLC));
}

function filterEntries(entries, predicate) {
  return entries.flatMap((entry) => filterEntry(entry, predicate));
}

function filterEntry(entry, predicate) {
  const children = filterEntries(entry.children, predicate);
  if (children.length || predicate(entry)) {
    return [{ ...entry, children }];
  } else {
    return [];
  }
}

export const FilePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { fileId } = useParams();
  const file = useFile(fileId);

  if (!file) {
    return <Navigate to="/" replace />;
  }

  const entries = file.entries;

  const filteredEntries = searchQuery
    ? filterEntries(entries, satisfies(searchQuery))
    : entries;

  return (
    <Page
      header={
        <>
          <Search value={searchQuery} onChange={setSearchQuery} />
          <ToolbarLink to="/">&laquo;&nbsp;back</ToolbarLink>
        </>
      }
    >
      <Tree file={file} entries={filteredEntries} />
    </Page>
  );
};
