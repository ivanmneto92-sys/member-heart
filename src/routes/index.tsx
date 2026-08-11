import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Handshake,
  Ticket,
  Gift,
  ShoppingBag,
  Sparkles,
  PlayCircle,
  Bus,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from "lucide-react";
import sportLogo from "@/assets/filhas-do-almirante-logo.png";
import torcidaJovem from "@/assets/filhas-do-almirante-logo.png";
import arquibancadaLogo from "@/assets/arquibancada-vantagens.png";
import {
  getNextSportFixture,
  getUpcomingSportFixtures,
  getRecentSportFixtures,
  getTeamStandings,
} from "@/lib/fixtures.functions";
import { getFandomPlans, type ApiPlan } from "@/lib/plans.functions";

const partnerModules = import.meta.glob("@/assets/parceiros/*.{webp,png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const PARTNERS = Object.entries(partnerModules)
  .map(([path, src]) => {
    const file = path.split("/").pop() ?? "";
    const base = file.replace(/\.[^.]+$/, "").replace(/-removebg-preview|captura_de_tela_[\d_-]+/gi, "");
    const name = base
      .split(/[-_]/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
      .trim();
    return { src, name: name || "Parceiro", alt: `Logo do parceiro ${name || "oficial"}` };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const SITE_URL = "https://galochopp.socioadv.com.br";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [next, upcoming, recent, standings, plans] = await Promise.all([
      getNextSportFixture(),
      getUpcomingSportFixtures(),
      getRecentSportFixtures(),
      getTeamStandings(),
      getFandomPlans(),
    ]);
    return { next, upcoming, recent, standings, plans };
  },
  head: ({ loaderData }) => {
    const fixture = loaderData?.next?.data;
    const sportsEvent = fixture
      ? {
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name: `${fixture.homeName} x ${fixture.awayName}`,
          startDate: fixture.date,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: fixture.venue || "A definir",
          },
          homeTeam: { "@type": "SportsTeam", name: fixture.homeName },
          awayTeam: { "@type": "SportsTeam", name: fixture.awayName },
          organizer: { "@type": "Organization", name: fixture.league || "Vasco" },
        }
      : null;
    return {
      meta: [
        { title: "Filhas do Almirante — Torcida Oficial do Vasco | Programa de Sócia" },
        {
          name: "description",
          content:
            "Seja sócia da Filhas do Almirante, torcida oficial do Vasco. Descontos em ingressos de São Januário, parceiros, caravanas, telemedicina e experiências exclusivas para o cruzmaltino.",
        },
        { property: "og:title", content: "Filhas do Almirante — Torcida Oficial do Vasco" },
        {
          property: "og:description",
          content:
            "Programa de sócia da Filhas do Almirante: ingressos do Vasco com desconto, rede de parceiros, caravanas e benefícios exclusivos para a torcida cruzmaltina.",
        },
        { property: "og:url", content: `${SITE_URL}/` },
      ],
      links: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap",
        },
        { rel: "icon", type: "image/png", href: sportLogo },
        { rel: "canonical", href: `${SITE_URL}/` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsOrganization",
            name: "Filhas do Almirante — Torcida Oficial do Vasco",
            alternateName: "Torcida Filhas do Almirante",
            url: SITE_URL,
            logo: `${SITE_URL}/favicon.ico`,
            sport: "Soccer",
            areaServed: "Rio de Janeiro, Brasil",
            description:
              "Programa de sócia da Filhas do Almirante — torcida oficial do Vasco.",
          }),
        },
        ...(sportsEvent
          ? [{ type: "application/ld+json", children: JSON.stringify(sportsEvent) }]
          : []),
      ],
    };
  },
  component: Index,
});

const css = `
  .socio { --sport-red: #000000; --sport-red-dark: #1a1a1a; --sport-yellow: #FFFFFF; --sport-black: #1A0A0A; }
  .socio * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
  .socio { background: var(--sport-yellow); color: #000; min-height: 100vh; }
  .socio a { cursor: pointer; }

  .topbar { background: linear-gradient(90deg, #000000 0%, #1a1a1a 60%, #000000 100%); color: #fff; padding: 8px 60px; display: flex; justify-content: flex-end; gap: 24px; font-size: 12px; letter-spacing: 0.5px; }
  .topbar a { color: #fff; text-decoration: none; opacity: 0.85; }
  .topbar a.btn-cta { background: var(--sport-yellow); color: #000; padding: 4px 14px; border-radius: 2px; font-weight: 700; opacity: 1; }

  .header { background: var(--sport-yellow); border-bottom: 2px solid var(--sport-black); padding: 18px 60px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 18px; position: relative; }
  .header::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 4px; background: var(--sport-red); }
  .logo { display: flex; align-items: center; gap: 14px; }
  .logo-mark { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; }
  .logo-mark img { width: 100%; height: 100%; object-fit: contain; }
  .logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 2px; line-height: 1; color: var(--sport-red); }
  .logo-text small { display: block; font-family: 'Inter', sans-serif; font-size: 10px; letter-spacing: 4px; font-weight: 600; margin-top: 2px; color: var(--sport-red); }
  .nav { display: flex; gap: 36px; }
  .nav a { color: #000; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; position: relative; }
  .nav a.active::after { content: ''; position: absolute; bottom: -8px; left: 0; right: 0; height: 3px; background: var(--sport-red); }
  .nav a:hover { color: var(--sport-red); }
  .nav-instagram { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff !important; border-radius: 999px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; }
  .nav-instagram:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(220, 39, 67, 0.4); color: #fff !important; }
  .nav-instagram::after { display: none !important; }

  .quem-somos-band { background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%); color: #fff; padding: 90px 60px 100px; position: relative; overflow: hidden; }
  .quem-somos-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06), transparent 60%); pointer-events: none; }
  .quem-somos-band .section-eyebrow { color: var(--sport-yellow); }
  .quem-somos-band .section-title { color: #fff; }
  .quem-somos-band .section-divider { background: var(--sport-yellow); }
  .quem-somos-band .section-header { padding-top: 0; padding-bottom: 40px; position: relative; z-index: 2; }
  .qs-intro { max-width: 820px; margin: 0 auto 60px; text-align: center; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); position: relative; z-index: 2; }
  .qs-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; position: relative; z-index: 2; }
  .qs-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-left: 4px solid #fff; padding: 28px 28px; border-radius: 4px; transition: all 0.3s; }
  .qs-card:hover { background: rgba(255,255,255,0.08); transform: translateY(-3px); }
  .qs-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
  .qs-card-icon { width: 44px; height: 44px; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; }
  .qs-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #fff; line-height: 1; }
  .qs-card-text { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.85); }
  .qs-list { list-style: none; padding: 0; margin: 8px 0 0; }
  .qs-list li { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 14px; color: rgba(255,255,255,0.9); }
  .qs-list li::before { content: '▶'; color: #fff; font-size: 10px; margin-top: 4px; flex-shrink: 0; }
  .qs-pillars { max-width: 1100px; margin: 50px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; position: relative; z-index: 2; }
  .qs-pillar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); padding: 22px 20px; border-radius: 4px; text-align: center; }
  .qs-pillar-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: var(--sport-yellow); margin-bottom: 8px; }
  .qs-pillar-text { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.8); }
  .qs-cta { max-width: 900px; margin: 60px auto 0; padding: 36px 28px; background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.3); border-radius: 6px; text-align: center; position: relative; z-index: 2; }
  .qs-cta h3 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 2px; margin-bottom: 16px; color: #fff; }
  .qs-cta p { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85); margin-bottom: 24px; max-width: 600px; margin-left: auto; margin-right: auto; }
  .qs-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .qs-btn-wa { background: #25D366; color: #fff; padding: 14px 26px; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; text-decoration: none; letter-spacing: 1px; font-size: 14px; transition: transform 0.2s; }
  .qs-btn-wa:hover { transform: translateY(-2px); color: #fff; }
  .qs-btn-ig { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 14px 26px; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; text-decoration: none; letter-spacing: 1px; font-size: 14px; transition: transform 0.2s; }
  .qs-btn-ig:hover { transform: translateY(-2px); color: #fff; }

  .hero { background: #000; color: #fff; padding: 90px 60px 110px; position: relative; overflow: hidden; }
  .hero::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.7); z-index: 2; pointer-events: none; }
  .hero-mascot { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; opacity: 0.5; pointer-events: none; z-index: 1; filter: grayscale(1) brightness(0.5) contrast(1.1); }
  .hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.4) 100%); z-index: 2; pointer-events: none; }
  .hero-content { max-width: 700px; position: relative; z-index: 3; }
  .hero-tag { display: inline-block; border: 1px solid var(--sport-yellow); color: var(--sport-yellow); padding: 6px 14px; font-size: 11px; letter-spacing: 3px; margin-bottom: 30px; text-transform: uppercase; font-weight: 700; }
  .hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: 110px; line-height: 0.95; letter-spacing: 2px; margin-bottom: 28px; }
  .hero h1 span { -webkit-text-stroke: 2px var(--sport-yellow); color: transparent; }
  .hero p { font-size: 18px; font-weight: 300; line-height: 1.6; margin-bottom: 36px; max-width: 540px; opacity: 0.95; }
  .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
  .hero-buttons .show-mobile { display: none; }
  .btn { padding: 16px 38px; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; cursor: pointer; border: none; transition: all 0.3s; display: inline-block; }
  .btn-primary { background: var(--sport-yellow); color: var(--sport-red); }
  .btn-primary:hover { background: #fff; color: var(--sport-red); }
  .btn-outline { background: transparent; color: #fff; border: 2px solid #fff; }
  .btn-outline:hover { background: var(--sport-yellow); color: var(--sport-red); border-color: var(--sport-yellow); }

  .next-game { position: absolute; top: 50%; right: 60px; transform: translateY(-50%); background: var(--sport-yellow); color: #000; padding: 32px 40px; width: 380px; z-index: 3; border: 1px solid var(--sport-black); border-top: 6px solid var(--sport-red); }
  .next-game-label { font-size: 10px; letter-spacing: 4px; font-weight: 700; margin-bottom: 4px; color: var(--sport-red); }
  .next-game-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #000; }
  .next-game-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
  .team { text-align: center; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 8px; }
  .team-shield { width: 60px; height: 60px; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 24px; overflow: hidden; }
  .team-shield img { width: 100%; height: 100%; object-fit: contain; }
  .team-name { font-size: 11px; font-weight: 700; letter-spacing: 1px; min-height: 28px; display: flex; align-items: center; justify-content: center; text-align: center; }
  .vs { font-family: 'Bebas Neue', sans-serif; font-size: 28px; padding: 0 12px; }
  .next-game-date { text-align: center; font-size: 13px; font-weight: 700; margin-bottom: 16px; padding: 10px 0; background: var(--sport-red); color: #fff; }
  .checkin-btn { width: 100%; padding: 14px; background: var(--sport-black); color: #fff; font-size: 12px; letter-spacing: 2px; font-weight: 700; text-align: center; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.3s; }
  .checkin-btn:hover { background: var(--sport-red); }
  .checkin-btn:disabled { background: #555; cursor: not-allowed; }

  .section-header { text-align: center; padding: 80px 60px 50px; }
  .section-eyebrow { font-size: 11px; letter-spacing: 5px; font-weight: 700; color: var(--sport-red); margin-bottom: 14px; text-transform: uppercase; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; letter-spacing: 3px; line-height: 1; margin-bottom: 16px; }
  .section-divider { width: 60px; height: 3px; background: var(--sport-red); margin: 0 auto; }

  .benefits-band { background: var(--sport-yellow); }
  .benefits { padding: 0 60px 100px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .benefit { background: transparent; border: 1px solid var(--sport-red); padding: 32px 24px; text-align: left; transition: all 0.3s; }
  .benefit:hover { background: var(--sport-red); color: #fff; border-color: var(--sport-red); transform: translateY(-4px); }
  .benefit:hover .benefit-icon { background: #fff; color: var(--sport-red); }
  .benefit:hover .benefit-text { color: #fff; }
  .benefit-icon { width: 64px; height: 64px; background: var(--sport-red); color: var(--sport-yellow); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; transition: all 0.3s; border: 2px solid var(--sport-red); position: relative; }
  .benefit-icon::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 4px; background: #1a1a1a; transition: background 0.3s; }
  .benefit:hover .benefit-icon::after { background: var(--sport-yellow); }
  .benefit-icon svg { width: 30px; height: 30px; stroke-width: 1.75; }
  .benefit-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 10px; }
  .benefit-text { font-size: 13px; line-height: 1.6; color: #3a1a00; transition: color 0.3s; }

  .planos-section { background: linear-gradient(180deg, var(--sport-red) 0%, var(--sport-red-dark) 100%); color: #fff; padding: 90px 40px 110px; position: relative; overflow: hidden; }
  .planos-section .section-eyebrow { color: var(--sport-yellow); }
  .planos-section .section-title { color: #fff; }
  .planos-section .section-divider { background: var(--sport-yellow); }
  .planos-section .section-header { padding-top: 0; padding-bottom: 60px; }

  .planos-grid { display: flex; flex-wrap: wrap; gap: 24px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; align-items: stretch; justify-content: center; }
  .planos-grid .plano { flex: 0 1 280px; }
  .plano { background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%); color: #fff; padding: 28px 22px 26px; position: relative; border: 2px solid var(--sport-yellow); border-radius: 8px; display: flex; flex-direction: column; box-shadow: 0 10px 24px rgba(0,0,0,0.35); }
  .plano.featured { border-color: var(--sport-yellow); box-shadow: 0 0 0 3px var(--sport-yellow), 0 16px 32px rgba(0,0,0,0.5); transform: translateY(-8px); }
  .plano.featured::before { content: 'MAIS COMPLETO'; position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--sport-yellow); color: var(--sport-black); padding: 6px 16px; font-size: 10px; letter-spacing: 2.5px; font-weight: 800; white-space: nowrap; border-radius: 3px; }
  .plano-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1.5px; margin-bottom: 6px; padding-bottom: 14px; border-bottom: 2px solid var(--sport-yellow); line-height: 1.05; color: #fff; text-align: center; }
  .plano-tagline { font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.85); margin: 0 0 14px; text-align: center; min-height: 54px; }
  .plano-price { margin: 8px auto 22px; background: transparent; border: none; padding: 10px 20px; display: inline-flex; align-items: baseline; gap: 4px; align-self: center; }
  .plano-price .currency { font-size: 14px; color: var(--sport-yellow); font-weight: 700; }
  .plano-price .value { font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: 0.5px; line-height: 1; color: var(--sport-yellow); }
  .plano-price .period { display: none; }
  .plano-features { list-style: none; margin-bottom: 22px; flex-grow: 1; }
  .plano-features li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.18); font-size: 12px; line-height: 1.45; display: flex; align-items: flex-start; gap: 8px; color: #fff; }
  .plano-features li::before { content: '✓'; font-weight: 800; flex-shrink: 0; color: var(--sport-yellow); }
  .plano-cta { display: block; text-align: center; padding: 14px; background: var(--sport-yellow); color: var(--sport-black); text-decoration: none; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; border: none; width: 100%; cursor: pointer; transition: all 0.3s; border-radius: 4px; }
  .plano-cta:hover { background: #fff; color: var(--sport-red); }
  .plano.featured .plano-cta { background: var(--sport-yellow); color: var(--sport-black); }
  .plano.featured .plano-cta:hover { background: #fff; }

  .cta-strip { background: var(--sport-yellow); border-top: 2px solid var(--sport-black); border-bottom: 6px solid var(--sport-red); padding: 50px 60px; display: flex; justify-content: space-between; align-items: center; gap: 30px; flex-wrap: wrap; position: relative; overflow: hidden; }
  .cta-strip-mascot { position: absolute; right: 280px; top: 50%; transform: translateY(-50%); width: 200px; opacity: 0.1; pointer-events: none; }
  .cta-strip-text { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 2px; line-height: 1; position: relative; z-index: 2; }
  .cta-strip-text small { display: block; font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 2px; font-weight: 500; margin-top: 8px; color: #555; }
  .cta-strip .btn-primary { position: relative; z-index: 2; }

  .footer { background: linear-gradient(180deg, #000000 0%, #1a1a1a 40%, #000000 100%); color: #fff; padding: 70px 60px 30px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 50px; border-bottom: 1px solid #333; }
  .footer-brand { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
  .footer-brand img { width: 52px; height: 52px; object-fit: contain; background: var(--sport-yellow); padding: 4px; border-radius: 50%; }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; }
  .footer-logo small { display: block; font-size: 10px; letter-spacing: 4px; color: var(--sport-red); font-family: 'Inter', sans-serif; font-weight: 700; margin-top: 2px; }
  .footer-desc { font-size: 13px; line-height: 1.7; opacity: 0.7; max-width: 320px; }
  .footer-col h4 { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 22px; font-weight: 700; color: var(--sport-yellow); }
  .footer-col a { display: block; color: #fff; text-decoration: none; font-size: 13px; margin-bottom: 12px; opacity: 0.7; }
  .footer-col a:hover { opacity: 1; color: var(--sport-red); }
  .footer-bottom { padding-top: 28px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; opacity: 0.85; letter-spacing: 1px; flex-wrap: wrap; gap: 16px; }
  .partner-of { display: flex; align-items: center; gap: 12px; }
  .partner-of span { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #fff; font-weight: 600; }
  .partner-of img { height: 36px; width: auto; object-fit: contain; background: #fff; padding: 6px 10px; border-radius: 6px; }
  .social { display: flex; gap: 12px; }
  .social-icon { width: 36px; height: 36px; border: 1px solid #fff; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; font-size: 14px; }
  .social-icon:hover { background: var(--sport-red); color: #fff; border-color: var(--sport-red); }

  .fixtures-section { padding: 0 60px 100px; max-width: 1200px; margin: 0 auto; }
  .fixtures-table { width: 100%; border-collapse: collapse; border: 1px solid var(--sport-black); }
  .fixtures-table thead { background: var(--sport-black); color: #fff; }
  .fixtures-table th { font-size: 11px; letter-spacing: 2px; padding: 14px 12px; text-align: left; font-weight: 700; }
  .fixtures-table td { padding: 14px 12px; border-top: 1px solid #eee; font-size: 13px; vertical-align: middle; }
  .fixtures-table tr:hover td { background: #fafafa; }
  .fixtures-table .fx-team { display: flex; align-items: center; gap: 10px; font-weight: 600; }
  .fixtures-table .fx-team img { width: 26px; height: 26px; object-fit: contain; }
  .fixtures-table .fx-vs { text-align: center; font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--sport-red); }
  .fixtures-table .fx-league { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #555; }
  .fixtures-table .fx-league img { width: 20px; height: 20px; object-fit: contain; }
  .fixtures-table .fx-date { font-weight: 700; white-space: nowrap; }
  .fixtures-table .fx-venue { font-size: 12px; color: #555; }
  .fixtures-table .fx-score { display: inline-block; padding: 3px 10px; border-radius: 4px; font-weight: 800; color: #fff; background: #888; }
  .fixtures-table .fx-score-v { background: #1f8a3a; }
  .fixtures-table .fx-score-e { background: #6b6b6b; }
  .fixtures-table .fx-score-d { background: var(--sport-red); }
  .standings-table td, .standings-table th { text-align: center; }
  .standings-table td:nth-child(2), .standings-table th:nth-child(2) { text-align: left; }
  .standings-table .row-target td { background: rgba(200, 16, 46, 0.12); font-weight: 700; }
  .fixtures-empty { padding: 30px; text-align: center; color: #555; border: 1px dashed #ccc; }

  .partners-band { background: var(--sport-red); padding: 70px 60px 90px; position: relative; overflow: hidden; }
  .partners-band::before, .partners-band::after { content: ''; position: absolute; top: 0; bottom: 0; width: 180px; background-image: radial-gradient(rgba(0,0,0,0.18) 1.5px, transparent 1.6px); background-size: 10px 10px; pointer-events: none; opacity: 0.55; }
  .partners-band::before { left: 0; }
  .partners-band::after { right: 0; }
  .partners-band-inner { max-width: 1400px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
  .partners-eyebrow { color: var(--sport-yellow); }
  .partners-title { color: var(--sport-yellow); }
  .partners-divider { background: var(--sport-yellow); margin-bottom: 18px; }
  .partners-sub { color: #fff; font-size: 15px; margin-bottom: 36px; }

  .partners-carousel { position: relative; display: flex; align-items: center; justify-content: center; gap: 14px; }
  .partners-card { background: #fff; border-radius: 14px; padding: 28px 30px; flex: 1; max-width: 1100px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.25); }
  .partners-track { display: grid; grid-template-columns: repeat(5, 1fr); align-items: center; gap: 0; }
  .partner-cell { display: flex; align-items: center; justify-content: center; height: 90px; padding: 0 18px; position: relative; }
  .partner-cell + .partner-cell::before { content: ''; position: absolute; left: 0; top: 12%; bottom: 12%; width: 1px; background: var(--sport-red); opacity: 0.7; }
  .partner-cell img { max-width: 100%; max-height: 70px; object-fit: contain; }
  .partners-arrow { width: 44px; height: 44px; border-radius: 9999px; background: var(--sport-yellow); color: var(--sport-red); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 14px rgba(0,0,0,0.25); transition: transform .2s; flex: 0 0 auto; }
  .partners-arrow:hover { transform: scale(1.08); }
  .partners-dots { display: flex; gap: 8px; justify-content: center; margin-top: 22px; }
  .partners-dot { width: 28px; height: 5px; border-radius: 4px; background: rgba(255,255,255,0.35); border: none; cursor: pointer; padding: 0; transition: background .2s; }
  .partners-dot.active { background: var(--sport-yellow); }

  @media (max-width: 700px) {
    .partners-band { padding: 50px 16px 70px; }
    .partners-track { grid-template-columns: 1fr; }
    .partner-cell { height: 110px; padding: 0 10px; }
    .partner-cell::before { display: none !important; }
    .partner-cell img { max-height: 90px; }
  }


  @media (max-width: 800px) {
    .fixtures-section { padding: 0 16px 60px; }
    .fixtures-table .fx-hide { display: none; }
    .fixtures-table th, .fixtures-table td { padding: 8px 4px; font-size: 12px; }
    .fixtures-table .fx-team { font-size: 11px; gap: 6px; }
    .fixtures-table .fx-team img { width: 20px; height: 20px; }
    .fixtures-table .fx-date { font-size: 11px; }
  }

  @media (max-width: 1100px) {
    .hero-mascot { opacity: 0.4; }
    .next-game { position: relative; top: auto; right: auto; transform: none; margin-top: 40px; width: 100%; max-width: 420px; z-index: 3; }
    .hero { padding: 60px 30px; }
    .hero h1 { font-size: 72px; }
    .benefits { grid-template-columns: repeat(2, 1fr); padding: 0 30px 60px; }
    .planos-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .plano.featured { transform: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
    .header, .topbar, .planos-section, .cta-strip, .footer { padding-left: 30px; padding-right: 30px; }
    .nav { display: none; }
    .section-title { font-size: 44px; }
    .cta-strip-text { font-size: 28px; }
    .cta-strip-mascot { display: none; }
    .qs-grid { grid-template-columns: 1fr; }
    .qs-pillars { grid-template-columns: 1fr; }
    .quem-somos-band { padding: 60px 24px 70px; }
  }
  @media (max-width: 600px) {
    .topbar { padding: 8px 16px; gap: 12px; justify-content: center; }
    .topbar a.btn-cta { width: 100%; text-align: center; padding: 8px 14px; }
    .header { padding: 14px 20px; }
    .logo-text { font-size: 22px; }
    .hero { padding: 50px 20px 70px; }
    .hero-tag { font-size: 10px; letter-spacing: 2px; padding: 5px 10px; margin-bottom: 20px; }
    .hero h1 { font-size: 44px; letter-spacing: 1px; line-height: 1; margin-bottom: 22px; }
    .hero p { font-size: 15px; margin-bottom: 28px; }
    .hero-buttons { gap: 12px; }
    .hero-buttons .btn { padding: 14px 18px; font-size: 11px; letter-spacing: 1.5px; flex: 1 1 100%; text-align: center; }
    .hero-buttons .hide-mobile { display: none; }
    .hero-buttons .show-mobile { display: inline-block; }
    .next-game { padding: 24px 22px; }
    .next-game-title { font-size: 18px; }
    .team-name { font-size: 10px; min-height: 24px; }
    .team-shield { width: 50px; height: 50px; }
    .vs { font-size: 22px; padding: 0 8px; }
    .section-header { padding: 50px 20px 30px; }
    .section-title { font-size: 36px; letter-spacing: 2px; }
    .section-eyebrow { font-size: 10px; letter-spacing: 3px; }
    .benefits { grid-template-columns: 1fr; padding: 0 20px 60px; gap: 16px; }
    .planos-section { padding: 60px 20px 70px; }
    .planos-grid { gap: 28px; grid-template-columns: 1fr; }
    .plano { padding: 28px 22px; }
    .plano-name { font-size: 22px; }
    .plano-price .value { font-size: 44px; }
    .plano.featured::before { font-size: 9px; padding: 5px 12px; letter-spacing: 2px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; padding-bottom: 32px; }
    .footer { padding: 50px 20px 24px; }
    .cta-strip { padding: 36px 20px; flex-direction: column; text-align: center; gap: 20px; }
    .cta-strip-text { font-size: 24px; }
    .cta-strip .btn { width: 100%; }
    .footer-bottom { flex-direction: column; text-align: center; gap: 16px; }
    .hero-content { text-align: center; margin: 0 auto; }
    .hero p { margin-left: auto; margin-right: auto; }
    .hero-buttons { justify-content: center; }
    .next-game { margin-left: auto; margin-right: auto; }
    .benefit { text-align: center; }
    .benefit-icon { margin-left: auto; margin-right: auto; }
    .footer-grid { text-align: center; }
    .footer-brand { justify-content: center; }
    .footer-desc { margin-left: auto; margin-right: auto; }
    .social { justify-content: center; }
  }
`;

const CHECKOUT_BASE = "https://filhasdoalmirante.arquibancadadevantagens.com.br";

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function pickMonthlyPrice(plan: ApiPlan) {
  if (!plan.prices || plan.prices.length === 0) return null;
  const monthly = plan.prices.find((p) => p.intervalMonths === 1);
  if (monthly) return monthly;
  return [...plan.prices].sort((a, b) => a.intervalMonths - b.intervalMonths)[0];
}

const BENEFITS = [
  { Icon: Handshake, title: "REDE DE PARCEIROS", text: "Empresas parceiras com descontos especiais em diversos setores para sócias da Filhas do Almirante." },
  { Icon: ShoppingBag, title: "LOJA OFICIAL", text: "Desconto em produtos oficiais e em lojas credenciadas pela torcida." },
  { Icon: PlayCircle, title: "CONTEÚDO", text: "App exclusivo com conteúdo, comunicados e bastidores da torcida." },
  { Icon: Bus, title: "CARAVANAS", text: "Vagas garantidas e descontos nas caravanas oficiais para jogos fora de casa." },
  { Icon: CalendarHeart, title: "EVENTOS", text: "Convites para eventos, encontros e ações da Filhas do Almirante." },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PartnersCarousel() {
  const [perPage, setPerPage] = useState(5);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth <= 700 ? 1 : 5);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const pages = Math.max(1, Math.ceil(PARTNERS.length / perPage));
  const [page, setPage] = useState(0);
  const safePage = Math.min(page, pages - 1);
  const start = safePage * perPage;
  const items = PARTNERS.slice(start, start + perPage);
  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);
  return (
    <>
      <div className="partners-carousel">
        <button className="partners-arrow" onClick={prev} aria-label="Anterior">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <div className="partners-card">
          <div className="partners-track">
            {items.map((p) => (
              <div className="partner-cell" key={p.name}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" width={160} height={70} />
              </div>
            ))}
          </div>
        </div>
        <button className="partners-arrow" onClick={next} aria-label="Próximo">
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>
      <div className="partners-dots">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            className={`partners-dot${i === safePage ? " active" : ""}`}
            onClick={() => setPage(i)}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}


function Index() {
  const { next, upcoming, recent, standings, plans } = Route.useLoaderData();
  const router = useRouter();
  const fixture = next.data;
  const upcomingList = upcoming.data;
  const recentList = recent.data;
  const standingsTable = standings.data;
  const apiPlans = plans.data as ApiPlan[];
  const plansError = !!plans.error || apiPlans.length === 0;

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const id = setInterval(() => {
      router.invalidate();
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [router]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    // Brasília time (UTC-3) — fixed offset to avoid SSR/CSR hydration mismatch
    const br = new Date(d.getTime() - 3 * 60 * 60 * 1000);
    const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
    const dd = String(br.getUTCDate()).padStart(2, "0");
    const mm = String(br.getUTCMonth() + 1).padStart(2, "0");
    const hh = String(br.getUTCHours()).padStart(2, "0");
    const mi = String(br.getUTCMinutes()).padStart(2, "0");
    return `${days[br.getUTCDay()]} ${dd}/${mm} — ${hh}:${mi}`;
  };

  return (
    <div className="socio">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Toaster />

      <div className="topbar">
        <a className="btn-cta" onClick={() => scrollToId("planos")}>Quero me Associar</a>
      </div>

      <header className="header">
        <div className="logo">
          <div className="logo-mark"><img src={sportLogo} alt="Filhas do Almirante" /></div>
          <div className="logo-text text-center mx-0 text-6xl">FILHAS DO ALMIRANTE<small>TORCIDA OFICIAL DO VASCO</small></div>
        </div>
        <nav className="nav">
          <a className="active" onClick={() => scrollToId("topo")}>Início</a>
          <Link to="/quem-somos">Quem Somos</Link>
          <a onClick={() => scrollToId("planos")}>Planos</a>
          <a onClick={() => scrollToId("tabela")}>Jogos</a>
          <a onClick={() => scrollToId("beneficios")}>Benefícios</a>
          <a onClick={() => scrollToId("parceiros")}>Parceiros</a>
          <a onClick={() => scrollToId("contato")}>Contato</a>
          <a
            className="nav-instagram"
            href="https://www.instagram.com/filhasdoalmirante/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Filhas do Almirante"
          >
            <Instagram size={18} strokeWidth={2} />
            <span>Instagram</span>
          </a>
        </nav>
      </header>

      <main>
      <section className="hero" id="topo">
        <img src={torcidaJovem} alt="Brasão da torcida Filhas do Almirante — Vasco" className="hero-mascot" width={1920} height={1080} fetchPriority="high" decoding="async" />
        <div className="hero-content">
          <span className="hero-tag">A FORÇA CRUZMALTINA</span>
          <h1>SEJA SÓCIA DA<br />FILHAS DO ALMIRANTE</h1>
          <p>Faça parte da Filhas do Almirante. Tenha acesso a benefícios exclusivos, descontos em ingressos do Vasco em São Januário, caravanas e experiências únicas com o Gigante da Colina.</p>
          <div className="hero-buttons">
            <a className="btn btn-primary" onClick={() => scrollToId("planos")}>Quero Ser Sócia</a>
            <a className="btn btn-outline hide-mobile" onClick={() => scrollToId("beneficios")}>Conhecer Benefícios</a>
            <Link to="/quem-somos" className="btn btn-outline show-mobile">Quem Somos</Link>
          </div>
        </div>

        <div className="next-game">
          <div className="next-game-label">PRÓXIMO JOGO</div>
          <div className="next-game-title">{fixture?.league ?? "Vasco"}</div>
          {(() => {
            const sport = { name: "VASCO", logo: fixture?.isHome ? fixture?.homeLogo : fixture?.awayLogo };
            const opp = { name: fixture?.opponentName?.toUpperCase() ?? "A DEFINIR", logo: fixture?.opponentLogo };
            const left = fixture && !fixture.isHome ? opp : sport;
            const right = fixture && !fixture.isHome ? sport : opp;
            return (
              <div className="next-game-info">
                <div className="team">
                  <div className="team-shield">
                    {left.logo ? <img src={left.logo} alt={`Escudo do ${left.name}`} /> : "?"}
                  </div>
                  <div className="team-name">{left.name}</div>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <div className="team-shield">
                    {right.logo ? <img src={right.logo} alt={`Escudo do ${right.name}`} /> : "?"}
                  </div>
                  <div className="team-name">{right.name}</div>
                </div>
              </div>
            );
          })()}
          <div className="next-game-date">
            {fixture ? formatDate(fixture.date) : "Em breve"}
          </div>
        </div>
      </section>





      <div className="section-header" id="tabela">
        <div className="section-eyebrow">CALENDÁRIO DO VASCO</div>
        <h2 className="section-title">PRÓXIMOS JOGOS</h2>
        <div className="section-divider"></div>
      </div>

      <section className="fixtures-section">
        {upcomingList.length === 0 ? (
          <div className="fixtures-empty">Nenhum jogo agendado no momento.</div>
        ) : (
          <table className="fixtures-table">
            <thead>
              <tr>
                <th>DATA</th>
                <th className="fx-hide">COMPETIÇÃO</th>
                <th style={{ textAlign: "right" }}>MANDANTE</th>
                <th></th>
                <th>VISITANTE</th>
                <th className="fx-hide">LOCAL</th>
              </tr>
            </thead>
            <tbody>
              {upcomingList.map((fx: typeof upcomingList[number]) => (
                <tr key={fx.date + fx.homeName + fx.awayName}>
                  <td className="fx-date">{formatDate(fx.date)}</td>
                  <td className="fx-hide">
                    <div className="fx-league">
                      {fx.leagueLogo && <img src={fx.leagueLogo} alt="" />}
                      <span>{fx.league}</span>
                    </div>
                  </td>
                  <td>
                    <div className="fx-team" style={{ justifyContent: "flex-end" }}>
                      <span>{fx.homeName}</span>
                      {fx.homeLogo && <img src={fx.homeLogo} alt="" />}
                    </div>
                  </td>
                  <td className="fx-vs">×</td>
                  <td>
                    <div className="fx-team">
                      {fx.awayLogo && <img src={fx.awayLogo} alt="" />}
                      <span>{fx.awayName}</span>
                    </div>
                  </td>
                  <td className="fx-hide fx-venue">{fx.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="partners-band" id="parceiros">
        <div className="partners-band-inner">
          <div className="section-eyebrow partners-eyebrow">DESCONTOS EXCLUSIVOS</div>
          <h2 className="section-title partners-title">EMPRESAS PARCEIRAS</h2>
          <div className="section-divider partners-divider"></div>
          <p className="partners-sub">Marcas que oferecem benefícios reais para as associadas.</p>

          <PartnersCarousel />
        </div>
      </section>

      <section className="benefits-band">
        <div className="section-header" id="beneficios">
          <div className="section-eyebrow">VANTAGENS EXCLUSIVAS</div>
          <h2 className="section-title">BENEFÍCIOS DA SÓCIA</h2>
          <div className="section-divider"></div>
        </div>

        <section className="benefits">
          {BENEFITS.map((b) => {
            const isEvento = b.title === "EVENTOS";
            if (isEvento) {
              return (
                <Link
                  to="/eventos"
                  className="benefit"
                  key={b.title}
                  style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                >
                  <div className="benefit-icon"><b.Icon strokeWidth={1.75} /></div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-text">{b.text}</p>
                </Link>
              );
            }
            return (
              <div className="benefit" key={b.title}>
                <div className="benefit-icon"><b.Icon strokeWidth={1.75} /></div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-text">{b.text}</p>
              </div>
            );
          })}
        </section>
      </section>


      <section className="planos-section" id="planos">
        <div className="section-header">
          <div className="section-eyebrow">ESCOLHA O SEU</div>
          <h2 className="section-title">PLANOS DE SÓCIA</h2>
          <div className="section-divider"></div>
        </div>

        {plansError ? (
          <div className="fixtures-empty">Planos indisponíveis no momento.</div>
        ) : (
          <div className="planos-grid">
            {apiPlans.map((p: ApiPlan) => {
              const featured = p.slug === "socio-almirante" || p.highlight?.variant === "popular";
              const price = pickMonthlyPrice(p);
              const benefits = p.benefits?.items ?? [];
              return (
                <div className={`plano${featured ? " featured" : ""}`} key={p._id}>
                  <h3 className="plano-name">{p.name.toUpperCase().replace(/-/g, " ")}</h3>
                  <div className="plano-price">
                    <span className="currency">R$</span>
                    <span className="value">{price ? formatBRL(price.amount) : "—"}</span>
                    <div className="period">{price && price.intervalMonths === 1 ? "por mês" : price ? `a cada ${price.intervalMonths} meses` : ""}</div>
                  </div>
                  <ul className="plano-features">
                    {benefits.map((f: string) => <li key={f}>{f}</li>)}
                  </ul>
                  <a
                    className="plano-cta"
                    href={`${CHECKOUT_BASE}/?plano=${encodeURIComponent(p.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ASSOCIAR
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="cta-strip">
        <img src={sportLogo} alt="" className="cta-strip-mascot" aria-hidden="true" />
        <div className="cta-strip-text">
          PRONTA PARA SER FILHA DO ALMIRANTE?
          <small>Faça parte da torcida oficial do Vasco</small>
        </div>
        <a className="btn btn-primary" onClick={() => scrollToId("planos")}>Quero Ser Sócia</a>
      </section>
      </main>

      <footer className="footer" id="contato">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={sportLogo} alt="Filhas do Almirante" />
              <div className="footer-logo">FILHAS DO ALMIRANTE<small>TORCIDA OFICIAL DO VASCO</small></div>
            </div>
            <p className="footer-desc">Programa de sócia da Filhas do Almirante — torcida oficial do Vasco. Viva o Gigante da Colina, fortaleça a torcida e aproveite vantagens exclusivas.</p>
          </div>
          <div className="footer-col">
            <h4>Institucional</h4>
            <a onClick={() => scrollToId("topo")}>Sobre a Torcida</a>
            <a onClick={() => scrollToId("planos")}>Planos</a>
            <a onClick={() => scrollToId("beneficios")}>Benefícios</a>
            <a onClick={() => toast.info("Em breve.")}>Parceiros</a>
          </div>
          <div className="footer-col">
            <h4>Suporte</h4>
            <a onClick={() => toast.info("Em breve.")}>Dúvidas Frequentes</a>
            <a onClick={() => toast.info("Em breve.")}>Fale Conosco</a>
            <a onClick={() => toast.info("Em breve.")}>Termos de Uso</a>
            <a onClick={() => toast.info("Em breve.")}>Privacidade</a>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <a>WhatsApp:</a>
            <a>Rio de Janeiro - RJ</a>
            <a>Seg-Sex: 9h às 18h</a>
            <a>Sáb: 9h às 16h</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 TORCIDA FILHAS DO ALMIRANTE — VASCO</div>
          <div className="partner-of">
            <span>Empresa parceira da:</span>
            <img src={arquibancadaLogo} alt="Arquibancada de Vantagens" />
          </div>
        </div>
      </footer>
    </div>
  );
}
