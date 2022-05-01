import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Page, ToolbarLink } from "../../widgets/page";
import { EntryView } from "../entry_view";

function* traverse(entries) {
  for (let entry of entries) {
    yield entry;
    if (entry.children) {
      yield* traverse(entry.children);
    }
  }
}

function findEntryById(entries, id) {
  for (let entry of traverse(entries)) {
    if (entry.id === id) {
      return entry;
    }
  }
  return null;
}

export const EntryPage = () => {
  const { id } = useParams();
  const { entries } = useSelector((state) => state);
  const entry = useMemo(() => {
    return findEntryById(entries, +id);
  }, [entries, id]);
  return (
    <Page header={<ToolbarLink to="/file">&laquo;&nbsp;back</ToolbarLink>}>
      <EntryView entry={entry} />
    </Page>
  );
};
