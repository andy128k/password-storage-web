import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import { createRoot } from "react-dom/client";
import { getRouter } from "./router";

const router = getRouter();

const root = createRoot(document.getElementById("app"));
root.render(<RouterProvider router={router} />);
