import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Page, ToolbarLink } from "../../widgets/page";
import { Search } from "../search";
import Tree from "../tree";

function satisfies(query) {
  query = query.toLowerCase();
  return (entry) =>
    Object.entries(entry)
      .filter(([key, _value]) => key !== "id" && key !== "children")
      .some(([_key, value]) => value.toLowerCase().includes(query));
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
  const { entries } = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState("");

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
      <Tree entries={filteredEntries} />
    </Page>
  );
};
