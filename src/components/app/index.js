import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { EntryPage } from "./entry_page";
import { FilePage } from "./file_page";
import { HomePage } from "./home_page";

export const RootApp = () => (
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/file/:fileId" element={<FilePage />} />
      <Route path="/file/:fileId/entry/:entryId" element={<EntryPage />} />
    </Routes>
  </HashRouter>
);
