import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-9xl text-nr">404</h1>
        <p className="mt-4 text-muted-foreground">This stage doesn’t exist.</p>
        <Link to="/" className="display mt-6 inline-block bg-cream px-5 py-3 text-lg text-ink">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-5xl">This page didn't load</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="display mt-6 bg-cream px-5 py-3 text-lg text-ink"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Namib Rage Events — Sound of Summer & Campout Dune Fest" },
      { name: "description", content: "Namib Rage Events, Windhoek: Sound of Summer, Campout Dune Fest, Barbarian bars, Howler ticketing and Fast Track permits." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://res.cloudinary.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:bg-camp focus:p-2 focus:text-ink">Skip to content</a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const isGateway = path === "/";
  return (
    <QueryClientProvider client={queryClient}>
      {!isGateway && <Header />}
      <main id="main" data-brand={path.startsWith("/festivals/sound-of-summer") ? "sos" : path.startsWith("/festivals/campout") ? "camp" : path.includes("bar-management") ? "barb" : path.includes("ticketing-cashless") ? "howler" : path.includes("fast-track") ? "ft" : "nr"} className={isGateway ? "" : "page-in"}>
        <Outlet />
      </main>
      {!isGateway && <Footer />}
    </QueryClientProvider>
  );
}
