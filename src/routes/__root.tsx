import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sócia Torcida Organizada do Vasco" },
      {
        name: "description",
        content:
          "Programa de sócio da Torcida Organizada do Vasco (TOV 1944). Ingressos com desconto, parceiros, caravanas e benefícios exclusivos para o cruzmaltino.",
      },
      { property: "og:site_name", content: "Torcida Organizada do Vasco — TOV 1944" },
      { property: "og:title", content: "Sócia Torcida Organizada do Vasco" },
      {
        property: "og:description",
        content:
          "Seja sócio da TOV e aproveite ingressos do Vasco com desconto, parceiros, caravanas e experiências exclusivas em São Januário.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sócia Torcida Organizada do Vasco" },
      {
        name: "twitter:description",
        content:
          "Programa de sócio da TOV: ingressos do Vasco com desconto, parceiros, caravanas e benefícios exclusivos.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9810430-e7a7-481e-94b7-b3bd7f807dba/id-preview-6a512055--af96c6b1-71c2-400f-b0f4-d938fc7d3a28.lovable.app-1779281206961.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9810430-e7a7-481e-94b7-b3bd7f807dba/id-preview-6a512055--af96c6b1-71c2-400f-b0f4-d938fc7d3a28.lovable.app-1779281206961.png" },
      { name: "description", content: "Portal de sócio da Torcida Organizada do Vasco (TOV 1944) com assinaturas e benefícios." },
      { property: "og:description", content: "Portal de sócio da Torcida Organizada do Vasco (TOV 1944) com assinaturas e benefícios." },
      { name: "twitter:description", content: "Portal de sócio da Torcida Organizada do Vasco (TOV 1944) com assinaturas e benefícios." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Torcida Organizada do Vasco — TOV 1944",
          url: "https://filhasdoalmirante.socioadv.com.br",
          inLanguage: "pt-BR",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
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
  return <Outlet />;
}
