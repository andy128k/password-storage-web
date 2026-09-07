import { Outlet } from "@tanstack/react-router";
import React from "react";
import { ContentProvider } from "../../contexts/content";
import { Devtools } from "./devtools";

export const RootComponent = () => (
  <ContentProvider>
    <Outlet />
    <Devtools />
  </ContentProvider>
);
