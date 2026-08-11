import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import logo from "@/assets/tov-logo-transparent.png";
import eventoBanner from "@/assets/evento-filhas-do-almirante.png";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — Torcida Organizada do Vasco" },
      {
        name: "description",
        content:
          "Confira todos os eventos, festas e encontros da Torcida Organizada do Vasco.",
      },
      { property: "og:title", content: "Eventos — Torcida Organizada do Vasco" },
      {
        property: "og:description",
        content:
          "Confira todos os eventos, festas e encontros da Torcida Organizada do Vasco.",
      },
    ],
  }),
  component: EventosPage,
});

type Evento = {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  descricao: string;
  banner: string;
  link?: string;
};

const EVENTOS: Evento[] = [
  {
    id: "filhas-do-almirante-a-festa",
    titulo: "Torcida Organizada do Vasco — A Festa",
    data: "06 de Junho",
    horario: "18h",
    local: "Santo Cristo",
    endereco: "Rua Nabuco de Freitas, 73 — Santo Cristo, Rio de Janeiro",
    descricao:
      "A primeira grande festa da torcida. Música, integração e muita energia cruzmaltina feminina. Vem celebrar com a gente!",
    banner: eventoBanner,
    link: "https://www.sympla.com.br/filhas-do-almirante---a-festa__3358755",
  },
];

function EventosPage() {
  return (
    <div className="ev-page">
      <style>{`
        .ev-page { min-height: 100vh; background: linear-gradient(180deg, #0a0a0a 0%, #141414 60%, #1a1a1a 100%); color: #fff; font-family: 'Inter', system-ui, sans-serif; }
        .ev-top { display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .ev-brand { display: flex; align-items: center; gap: 12px; }
        .ev-brand img { width: 42px; height: 42px; object-fit: contain; }
        .ev-brand span { font-family: 'Bebas Neue', sans-serif; letter-spacing: 3px; font-size: 18px; }
        .ev-back { display: inline-flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.85; transition: opacity 0.2s; }
        .ev-back:hover { opacity: 1; }

        .ev-hero { padding: 70px 40px 40px; text-align: center; position: relative; overflow: hidden; }
        .ev-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%); pointer-events: none; }
        .ev-eyebrow { color: var(--sport-yellow, #f5c518); font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 4px; margin-bottom: 14px; position: relative; z-index: 2; }
        .ev-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 8vw, 88px); letter-spacing: 6px; line-height: 1; margin: 0 0 16px; position: relative; z-index: 2; }
        .ev-divider { width: 80px; height: 4px; background: var(--sport-yellow, #f5c518); margin: 0 auto 24px; position: relative; z-index: 2; }
        .ev-lead { max-width: 720px; margin: 0 auto; font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.85); position: relative; z-index: 2; }

        .ev-list { max-width: 1100px; margin: 0 auto; padding: 40px 40px 80px; display: grid; grid-template-columns: 1fr; gap: 28px; }
        .ev-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; overflow: hidden; display: grid; grid-template-columns: 1fr 1.1fr; transition: transform 0.25s, border-color 0.25s; }
        .ev-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.25); }
        .ev-card-media { background: #000; min-height: 260px; display: flex; align-items: center; justify-content: center; }
        .ev-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ev-card-body { padding: 30px 32px; display: flex; flex-direction: column; gap: 14px; }
        .ev-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 2px; margin: 0; line-height: 1.05; }
        .ev-meta { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 4px 0 6px; }
        .ev-meta-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.88); }
        .ev-meta-item svg { color: var(--sport-yellow, #f5c518); flex-shrink: 0; }
        .ev-card-desc { font-size: 14.5px; line-height: 1.65; color: rgba(255,255,255,0.78); margin: 0; }
        .ev-card-actions { margin-top: auto; padding-top: 12px; display: flex; flex-wrap: wrap; gap: 10px; }
        .ev-btn-primary { background: var(--sport-yellow, #f5c518); color: #000; padding: 12px 22px; border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; text-decoration: none; letter-spacing: 1.5px; font-size: 12.5px; text-transform: uppercase; transition: transform 0.2s; }
        .ev-btn-primary:hover { transform: translateY(-2px); }

        .ev-empty { max-width: 600px; margin: 0 auto; padding: 60px 30px; text-align: center; background: rgba(255,255,255,0.04); border: 1px dashed rgba(255,255,255,0.2); border-radius: 10px; }
        .ev-empty h3 { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin: 0 0 10px; }
        .ev-empty p { color: rgba(255,255,255,0.75); font-size: 15px; margin: 0; }

        @media (max-width: 768px) {
          .ev-top { padding: 14px 16px; }
          .ev-brand span { display: none; }
          .ev-hero { padding: 40px 18px 28px; }
          .ev-title { letter-spacing: 3px; }
          .ev-lead { font-size: 15px; }
          .ev-list { padding: 24px 16px 60px; gap: 20px; }
          .ev-card { grid-template-columns: 1fr; }
          .ev-card-media { min-height: 200px; }
          .ev-card-body { padding: 22px 20px; }
          .ev-card-title { font-size: 24px; }
          .ev-card-desc { font-size: 14px; }
        }
      `}</style>

      <div className="ev-top">
        <div className="ev-brand">
          <img src={logo} alt="Torcida Organizada do Vasco" />
          <span>TORCIDA ORGANIZADA DO VASCO</span>
        </div>
        <Link to="/" className="ev-back">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      <section className="ev-hero">
        <div className="ev-eyebrow">AGENDA OFICIAL</div>
        <h1 className="ev-title">EVENTOS</h1>
        <div className="ev-divider" />
        <p className="ev-lead">
          Confira todos os eventos, festas, encontros e ações da{" "}
          <strong>Torcida Organizada do Vasco</strong>. Vem viver o Vasco com a gente.
        </p>
      </section>

      <section className="ev-list">
        {EVENTOS.length === 0 ? (
          <div className="ev-empty">
            <h3>EM BREVE</h3>
            <p>Novos eventos serão anunciados aqui. Fique de olho!</p>
          </div>
        ) : (
          EVENTOS.map((ev) => (
            <article className="ev-card" key={ev.id}>
              <div className="ev-card-media">
                <img src={ev.banner} alt={ev.titulo} />
              </div>
              <div className="ev-card-body">
                <h2 className="ev-card-title">{ev.titulo}</h2>
                <div className="ev-meta">
                  <div className="ev-meta-item">
                    <CalendarDays size={16} /> {ev.data}
                  </div>
                  <div className="ev-meta-item">
                    <Clock size={16} /> {ev.horario}
                  </div>
                  <div className="ev-meta-item">
                    <MapPin size={16} /> {ev.endereco}
                  </div>
                </div>
                <p className="ev-card-desc">{ev.descricao}</p>
                {ev.link && (
                  <div className="ev-card-actions">
                    <a
                      className="ev-btn-primary"
                      href={ev.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Ticket size={16} /> Comprar Ingresso
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
