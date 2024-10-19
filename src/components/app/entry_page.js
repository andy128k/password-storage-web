import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Page, ToolbarLink } from "../../widgets/page";
import { EntryView } from "../entry_view";
import { useFile } from "../../contexts/content";

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
  const { fileId, entryId } = useParams();
  const file = useFile(fileId);
  const entry = useMemo(() => {
    return findEntryById(file?.entries ?? [], entryId);
  }, [file, entryId]);

  if (!entry) {
    return <Navigate to={`/file/${fileId}`} replace />;
  }

  return (
    <Page
      header={
        <ToolbarLink to={`/file/${fileId}`}>&laquo;&nbsp;back</ToolbarLink>
      }
    >
      <EntryView entry={entry} />
    </Page>
  );
};
