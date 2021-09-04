import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Page, ToolbarLink } from '../../widgets/page';
import { Search } from '../search';
import Tree from '../tree';

function satisfies(query) {
  query = query.toLowerCase();
  return entry => {
    for (const key of Object.keys(entry)) {
      if (key !== 'id' && key !== 'children' && entry[key].toLowerCase().includes(query)) {
        return true;
      }
    }
    return false;
  };
}

const identity = v => v;

function filterEntries(entries, predicate) {
  return entries.map(entry => filterEntry(entry, predicate)).filter(identity);
}

function filterEntry(entry, predicate) {
  const children = filterEntries(entry.children, predicate);
  if (children.length || predicate(entry)) {
    return {...entry, children};
  } else {
    return null;
  }
}

export const FilePage = () => {
  const {entries} = useSelector(state => state);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = searchQuery ? filterEntries(entries, satisfies(searchQuery)) : entries;

  return (
    <Page header={
      <>
        <Search value={searchQuery} onChange={setSearchQuery} />
        <ToolbarLink to="/">&laquo;&nbsp;back</ToolbarLink>
      </>
    }>
      <Tree entries={filteredEntries} />
    </Page>
  );
};
