import React, { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFile } from "../../contexts/content";
import { Page, ToolbarLink } from "../../widgets/page";
import { EntryView } from "../entry_view";

function* traverse(entries) {
  for (const entry of entries) {
    yield entry;
    if (entry.children) {
      yield* traverse(entry.children);
    }
  }
}

function findEntryById(entries, id) {
  for (const entry of traverse(entries)) {
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
