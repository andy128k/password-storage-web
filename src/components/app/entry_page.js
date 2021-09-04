import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import { Page, ToolbarLink } from '../../widgets/page';
import EntryView from '../entry_view';

function findEntryById(entries, id) {
  for (let entry of entries) {
    if (entry.id === id) {
      return entry;
    }
    if (entry.children) {
      let e = findEntryById(entry.children, id);
      if (e) {
        return e;
      }
    }
  }
  return null;
}

export const EntryPage = () => {
  const match = useRouteMatch();
  const id = +match.params.id;
  const {entries} = useSelector(state => state);
  const entry = useMemo(() => {
    return findEntryById(entries, id);
  }, [entries, id]);
  return (
    <Page header={
      <ToolbarLink to="/file">&laquo;&nbsp;back</ToolbarLink>
    }>
      <EntryView entry={entry} />
    </Page>
  );
};
