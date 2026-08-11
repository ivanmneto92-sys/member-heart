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
      { title: "Sócia Filhas do Almirante" },
      {
        name: "description",
        content:
          "Programa de sócio da Galo Chopp, torcida oficial do CRB em Maceió. Ingressos com desconto, parceiros, caravanas e benefícios exclusivos para o rubro-negro alagoano.",
      },
      { property: "og:site_name", content: "Galo Chopp — Torcida Oficial do CRB" },
      { property: "og:title", content: "Sócia Filhas do Almirante" },
      {
        property: "og:description",
        content:
          "Seja sócio da torcida Galo Chopp e aproveite ingressos do CRB com desconto, parceiros, caravanas e experiências exclusivas no Estádio Rei Pelé.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sócia Filhas do Almirante" },
      {
        name: "twitter:description",
        content:
          "Programa de sócio da Galo Chopp: ingressos do CRB com desconto, parceiros, caravanas e benefícios exclusivos.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9810430-e7a7-481e-94b7-b3bd7f807dba/id-preview-6a512055--af96c6b1-71c2-400f-b0f4-d938fc7d3a28.lovable.app-1779281206961.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d9810430-e7a7-481e-94b7-b3bd7f807dba/id-preview-6a512055--af96c6b1-71c2-400f-b0f4-d938fc7d3a28.lovable.app-1779281206961.png" },
      { name: "description", content: "Sócio Filhas do Almirante is a membership portal for fans, managing subscriptions and benefits." },
      { property: "og:description", content: "Sócio Filhas do Almirante is a membership portal for fans, managing subscriptions and benefits." },
      { name: "twitter:description", content: "Sócio Filhas do Almirante is a membership portal for fans, managing subscriptions and benefits." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Galo Chopp — Torcida Oficial do CRB",
          url: "https://galochopp.socioadv.com.br",
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
