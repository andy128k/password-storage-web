import React from "react";
import { createRoot } from "react-dom/client";
import { ContentProvider } from "./contexts/content";
import { RootApp } from "./components/app";

const root = createRoot(document.getElementById("app"));
root.render(
  <ContentProvider>
    <RootApp />
  </ContentProvider>,
);
