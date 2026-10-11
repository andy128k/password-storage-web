import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export const Devtools = () =>
  process.env.NODE_ENV === "development" ? (
    <TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      plugins={[
        {
          name: "TanStack Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
      ]}
    />
  ) : null;
