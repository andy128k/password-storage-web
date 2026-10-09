import { Navigate, useParams } from "@tanstack/react-router";
import React, { useMemo } from "react";
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
  const { fileId, entryId } = useParams({
    from: "/file/$fileId/entry/$entryId",
  });
  const file = useFile(fileId);
  const entry = useMemo(() => {
    return findEntryById(file?.entries ?? [], entryId);
  }, [file, entryId]);

  if (!entry) {
    return <Navigate to="/file/$fileId" params={{ fileId }} replace />;
  }

  return (
    <Page
      header={
        <ToolbarLink to="/file/$fileId" params={{ fileId }}>
          &laquo;&nbsp;back
        </ToolbarLink>
      }
    >
      <EntryView entry={entry} />
    </Page>
  );
};
