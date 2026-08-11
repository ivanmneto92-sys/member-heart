import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Instagram,
  Anchor,
  Users,
  Heart,
  Megaphone,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import logo from "@/assets/filhas-do-almirante-logo-transparent.png";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Filhas do Almirante" },
      {
        name: "description",
        content:
          "Conheça a Filhas do Almirante, torcida organizada exclusivamente feminina do Vasco da Gama. Nossa história, missão e propósito.",
      },
      { property: "og:title", content: "Quem Somos — Filhas do Almirante" },
      {
        property: "og:description",
        content:
          "Torcida organizada exclusivamente feminina do Vasco da Gama. Pertencimento, consciência e resistência.",
      },
    ],
  }),
  component: QuemSomosPage,
});

function QuemSomosPage() {
  return (
    <div className="qs-page">
      <style>{`
        .qs-page { min-height: 100vh; background: linear-gradient(180deg, #0a0a0a 0%, #141414 60%, #1a1a1a 100%); color: #fff; font-family: 'Inter', system-ui, sans-serif; }
        .qs-page-top { display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .qs-back { display: inline-flex; align-items: center; gap: 8px; color: #fff; text-decoration: none; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.85; transition: opacity 0.2s; }
        .qs-back:hover { opacity: 1; }
        .qs-top-brand { display: flex; align-items: center; gap: 12px; }
        .qs-top-brand img { width: 42px; height: 42px; object-fit: contain; }
        .qs-top-brand span { font-family: 'Bebas Neue', sans-serif; letter-spacing: 3px; font-size: 18px; color: #fff; }

        .qs-hero { padding: 80px 40px 60px; text-align: center; position: relative; overflow: hidden; }
        .qs-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%); pointer-events: none; }
        .qs-hero-logo { width: 160px; height: 160px; object-fit: contain; margin: 0 auto 24px; filter: drop-shadow(0 8px 30px rgba(255,255,255,0.15)); position: relative; z-index: 2; }
        .qs-eyebrow { color: var(--sport-yellow, #f5c518); font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 4px; margin-bottom: 16px; position: relative; z-index: 2; }
        .qs-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 8vw, 96px); letter-spacing: 6px; line-height: 1; margin: 0 0 18px; position: relative; z-index: 2; }
        .qs-divider { width: 80px; height: 4px; background: var(--sport-yellow, #f5c518); margin: 0 auto 28px; position: relative; z-index: 2; }
        .qs-lead { max-width: 780px; margin: 0 auto; font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.85); position: relative; z-index: 2; }
        .qs-lead strong { color: #fff; }

        .qs-section { max-width: 1100px; margin: 0 auto; padding: 50px 40px; }
        .qs-section h2 { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 4px; margin: 0 0 28px; text-align: center; }

        .qs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .qs-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-left: 4px solid #fff; padding: 28px; border-radius: 4px; transition: all 0.3s; }
        .qs-card:hover { background: rgba(255,255,255,0.08); transform: translateY(-3px); }
        .qs-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .qs-card-icon { width: 46px; height: 46px; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; }
        .qs-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #fff; line-height: 1; margin: 0; }
        .qs-card-text { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0; }
        .qs-card-text strong { color: #fff; }

        .qs-list { list-style: none; padding: 0; margin: 8px 0 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 24px; }
        .qs-list li { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 14px; color: rgba(255,255,255,0.9); }
        .qs-list li::before { content: '▶'; color: var(--sport-yellow, #f5c518); font-size: 10px; margin-top: 4px; flex-shrink: 0; }

        .qs-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .qs-pillar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); padding: 28px 22px; border-radius: 4px; text-align: center; }
        .qs-pillar-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px; color: var(--sport-yellow, #f5c518); margin-bottom: 10px; }
        .qs-pillar-text { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.85); }

        .qs-cta { max-width: 900px; margin: 0 auto 80px; padding: 48px 32px; background: rgba(255,255,255,0.06); border: 1px dashed rgba(255,255,255,0.3); border-radius: 8px; text-align: center; }
        .qs-cta h3 { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 3px; margin: 0 0 16px; color: #fff; }
        .qs-cta p { font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.85); margin: 0 auto 28px; max-width: 620px; }
        .qs-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .qs-btn-wa { background: #25D366; color: #fff; padding: 14px 26px; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; text-decoration: none; letter-spacing: 1px; font-size: 14px; transition: transform 0.2s; }
        .qs-btn-wa:hover { transform: translateY(-2px); color: #fff; }
        .qs-btn-ig { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 14px 26px; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; text-decoration: none; letter-spacing: 1px; font-size: 14px; transition: transform 0.2s; }
        .qs-btn-ig:hover { transform: translateY(-2px); color: #fff; }

        @media (max-width: 768px) {
          .qs-page-top { padding: 14px 16px; }
          .qs-top-brand span { display: none; }
          .qs-hero { padding: 40px 18px 32px; }
          .qs-hero-logo { width: 120px; height: 120px; }
          .qs-title { font-size: 56px; letter-spacing: 3px; }
          .qs-lead { font-size: 15px; }
          .qs-section { padding: 28px 18px; }
          .qs-section h2 { font-size: 26px; letter-spacing: 2px; word-break: break-word; }
          .qs-grid { grid-template-columns: 1fr; gap: 14px; }
          .qs-card { padding: 22px 18px; }
          .qs-card-title { font-size: 19px; letter-spacing: 1.5px; }
          .qs-card-text { font-size: 14px; }
          .qs-list { grid-template-columns: 1fr; gap: 6px; }
          .qs-list li { font-size: 13.5px; }
          .qs-pillars { grid-template-columns: 1fr; gap: 12px; }
          .qs-pillar { padding: 22px 18px; }
          .qs-cta { margin: 0 16px 50px; padding: 28px 18px; }
          .qs-cta h3 { font-size: 26px; letter-spacing: 2px; line-height: 1.05; }
          .qs-cta p { font-size: 14px; }
          .qs-cta-actions { flex-direction: column; gap: 10px; align-items: stretch; }
          .qs-btn-wa, .qs-btn-ig { justify-content: center; padding: 13px 18px; font-size: 13px; letter-spacing: 0.5px; }
        }
      `}</style>

      <div className="qs-page-top">
        <div className="qs-top-brand">
          <img src={logo} alt="Filhas do Almirante" />
          <span>FILHAS DO ALMIRANTE</span>
        </div>
        <Link to="/" className="qs-back">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      <section className="qs-hero">
        <img src={logo} alt="Logo Filhas do Almirante" className="qs-hero-logo" />
        <div className="qs-eyebrow">COISAS QUE VOCÊ PROVAVELMENTE NÃO SABE</div>
        <h1 className="qs-title">QUEM SOMOS</h1>
        <div className="qs-divider"></div>
        <p className="qs-lead">
          A <strong>Filhas do Almirante</strong> é uma torcida organizada{" "}
          <strong>exclusivamente feminina</strong> do Vasco da Gama. Nascemos
          para somar, dar voz e abrir caminho — dentro e fora de campo.
        </p>
      </section>

      <section className="qs-section">
        <h2>NOSSA HISTÓRIA</h2>
        <div className="qs-grid">
          <div className="qs-card">
            <div className="qs-card-head">
              <div className="qs-card-icon"><Anchor size={22} /></div>
              <h3 className="qs-card-title">ONDE TUDO COMEÇOU</h3>
            </div>
            <p className="qs-card-text">
              Nascemos de um grupo de amigas viralizado em redes sociais, onde
              o intuito era juntar mulheres que não tinham costume de ir aos
              jogos do Vasco. O que era um encontro virou movimento.
            </p>
          </div>

          <div className="qs-card">
            <div className="qs-card-head">
              <div className="qs-card-icon"><Users size={22} /></div>
              <h3 className="qs-card-title">VIROU TORCIDA ORGANIZADA</h3>
            </div>
            <p className="qs-card-text">
              <strong>Exclusivamente feminina</strong> — não há homens no nosso
              escopo nem na nossa estrutura. Nascemos para somar e dar voz a
              pautas necessárias para as mulheres, dentro e fora de campo.
            </p>
          </div>

          <div className="qs-card">
            <div className="qs-card-head">
              <div className="qs-card-icon"><Heart size={22} /></div>
              <h3 className="qs-card-title">NOSSO PORQUÊ</h3>
            </div>
            <p className="qs-card-text">
              Queremos um ambiente onde mulheres se sintam{" "}
              <strong>pertencentes</strong>, onde exista apoio, conexão e
              segurança, dentro e fora do futebol e de outros esportes.
            </p>
          </div>

          <div className="qs-card">
            <div className="qs-card-head">
              <div className="qs-card-icon"><Megaphone size={22} /></div>
              <h3 className="qs-card-title">ONDE QUEREMOS CHEGAR</h3>
            </div>
            <p className="qs-card-text">
              Ser uma torcida que não só está presente, mas que{" "}
              <strong>marca, transforma e abre caminho</strong>. Apoiar e levar
              voz a causas que já estão em pauta, garantindo um espaço que é
              nosso.
            </p>
          </div>
        </div>
      </section>

      <section className="qs-section">
        <h2>ALÉM DAS ARQUIBANCADAS</h2>
        <div className="qs-card">
          <div className="qs-card-head">
            <div className="qs-card-icon"><Sparkles size={22} /></div>
            <h3 className="qs-card-title">O QUE VOCÊ VAI ENCONTRAR COM A GENTE</h3>
          </div>
          <ul className="qs-list">
            <li>Integração em grupos de associadas e regiões</li>
            <li>Eventos culturais</li>
            <li>Rodas de conversa</li>
            <li>Ações sociais</li>
            <li>Aulões profissionalizantes</li>
            <li>Lutas políticas sobre causas femininas</li>
          </ul>
        </div>
      </section>

      <section className="qs-section">
        <h2>NOSSOS PILARES</h2>
        <div className="qs-pillars">
          <div className="qs-pillar">
            <div className="qs-pillar-title">PERTENCIMENTO REAL</div>
            <p className="qs-pillar-text">
              Não é sobre estar, é sobre se sentir parte.
            </p>
          </div>
          <div className="qs-pillar">
            <div className="qs-pillar-title">CONSCIÊNCIA</div>
            <p className="qs-pillar-text">
              O futebol também é político. E a gente sabe disso.
            </p>
          </div>
          <div className="qs-pillar">
            <div className="qs-pillar-title">RESISTÊNCIA</div>
            <p className="qs-pillar-text">
              Existir com liberdade em um mundo que ainda violenta mulheres.
            </p>
          </div>
        </div>
      </section>

      <div className="qs-cta">
        <h3>QUERO SER UMA FILHA DO ALMIRANTE!</h3>
        <p>
          Entre em contato pelo número abaixo, receba informações sobre
          associação e faça parte dessa torcida incrível!
        </p>
        <div className="qs-cta-actions">
          <a
            className="qs-btn-wa"
            href="https://wa.me/5521969227647?text=Ol%C3%A1!%20Quero%20ser%20uma%20Filha%20do%20Almirante"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp (21) 96922-7647
          </a>
          <a
            className="qs-btn-ig"
            href="https://www.instagram.com/filhasdoalmirante/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} /> @filhasdoalmirante
          </a>
        </div>
      </div>
    </div>
  );
}
