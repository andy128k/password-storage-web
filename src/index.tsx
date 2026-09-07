import { RouterProvider } from "@tanstack/react-router";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getRouter } from "./router";

const router = getRouter();

const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
