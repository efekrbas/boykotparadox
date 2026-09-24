import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      {
        name: "google-site-verification",
        content: "hYFGZJAo0Z4zRDGxUsflXR2QQ-RwHAbmVURjZO-EBDw",
      },
      { title: "Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası | #BoycottParadox" },
      {
        name: "description",
        content: "Paradox Interactive resmi Discord'undaki Atatürk'e hakaret ve Türk oyuncuları sansürleme skandalına karşı tek ses! Steam, Metacritic, Trustpilot ve Google'da 1 yıldız vererek sesini duyur.",
      },
      {
        name: "keywords",
        content: "paradox boykot, boykot paradox, hearts of iron 4 ataturk, hoi4 boykot, paradox interactive boykot, ataturk skandali, steam 1 yildiz, paradox inceleme boykotu, hoi4 discord atatürk, eu4 boykot, ck3, victoria 3, stellaris, cities skylines, boycott paradox, paradox interactive scandal, emrah safa gürkan boykot, trustpilot paradox boykot, google paradox 1 yıldız, steam review bomb paradox",
      },
      {
        name: "news_keywords",
        content: "paradox boykot, boykot paradox, hearts of iron 4 ataturk, hoi4 discord, paradox interactive, ataturk skandali, steam boykot, emrah safa gürkan, paradox inceleme boykotu",
      },
      { name: "author", content: "Türk Oyuncu Topluluğu İnisiyatifi" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "revisit-after", content: "1 days" },
      { name: "rating", content: "general" },
      { name: "distribution", content: "global" },
      // GEO Meta Tags (Turkey & Global Geo-targeting)
      { name: "geo.region", content: "TR" },
      { name: "geo.placename", content: "Türkiye" },
      { name: "geo.position", content: "38.9637;35.2433" },
      { name: "ICBM", content: "38.9637, 35.2433" },
      // OpenGraph
      { property: "og:site_name", content: "Boykot Paradox — 1★ Boykot Hareketi" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:title", content: "Boykot Paradox — Resmi Atatürk Skandalına Karşı 1★ Kampanyası" },
      {
        property: "og:description",
        content: "Sadece Steam değil: Metacritic, Trustpilot, Epic, GOG ve Google üzerinden Paradox'u tek dokunuşla 1 yıldızla mühürle.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://boykotparadox.vercel.app/" },
      { property: "og:image", content: "https://boykotparadox.vercel.app/ataturk-human.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Gazi Mustafa Kemal Atatürk — Boykot Paradox Kampanyası" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası" },
      { name: "twitter:description", content: "Hearts of Iron IV Discord skandalına karşı Paradox Interactive oyunlarına ve kurumsal sayfalarına 1 yıldız vererek sesini duyur." },
      { name: "twitter:image", content: "https://boykotparadox.vercel.app/ataturk-human.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://boykotparadox.vercel.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico?v=2", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png?v=2" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png?v=2" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=2" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
