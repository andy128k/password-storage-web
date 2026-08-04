import React from "react";
import { createRoot } from "react-dom/client";
import { RootApp } from "./components/app";
import { ContentProvider } from "./contexts/content";

const root = createRoot(document.getElementById("app"));
root.render(
  <ContentProvider>
    <RootApp />
  </ContentProvider>,
);
