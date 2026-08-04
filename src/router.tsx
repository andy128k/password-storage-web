import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { EntryPage } from "./components/app/entry_page";
import { FilePage } from "./components/app/file_page";
import { HomePage } from "./components/app/home_page";
import { RootComponent } from "./components/app/root";

const rootRoute = createRootRoute({ component: RootComponent });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const fileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/file/$fileId",
  component: FilePage,
});

const entryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/file/$fileId/entry/$entryId",
  component: EntryPage,
});

export function getRouter() {
  const routeTree = rootRoute.addChildren([homeRoute, fileRoute, entryRoute]);
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    history: createHashHistory(),
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
