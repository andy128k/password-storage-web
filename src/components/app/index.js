import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./home_page";
import { FilePage } from "./file_page";
import { EntryPage } from "./entry_page";

export const RootApp = () => (
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/file" element={<FilePage />} />
      <Route path="/entry/:id" element={<EntryPage />} />
    </Routes>
  </HashRouter>
);
