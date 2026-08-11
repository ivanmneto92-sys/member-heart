import { createServerFn } from "@tanstack/react-start";

// Club de Regatas Vasco da Gama on ESPN
const TEAM_ID = "3454";
const TEAM_NAME = "Vasco";
const LEAGUES: Array<{ slug: string; name: string }> = [
  { slug: "bra.1", name: "Brasileirão Série A" },
  { slug: "bra.copa_do_brazil", name: "Copa do Brasil" },
  { slug: "conmebol.sudamericana", name: "Copa Sudamericana" },
];
const LEAGUE_SLUG = LEAGUES[0].slug;

export type FixtureItem = {
  league: string;
  leagueLogo: string;
  date: string;
  homeName: string;
  awayName: string;
  homeLogo: string;
  awayLogo: string;
  homeGoals: number | null;
  awayGoals: number | null;
  isHome: boolean;
  opponentName: string;
  opponentLogo: string;
  venue: string;
  status: string;
  finished: boolean;
};

export type NextFixture = FixtureItem | null;

export type StandingRow = {
  rank: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDiff: number;
  points: number;
  form: string;
  isTarget: boolean;
};

export type StandingsTable = {
  leagueId: string;
  leagueName: string;
  leagueLogo: string;
  season: number;
  rows: StandingRow[];
};

type FixturePayload = { data: NextFixture; error: string | null };
type FixturesPayload = { data: FixtureItem[]; error: string | null };
type StandingsPayload = { data: StandingsTable | null; error: string | null };

const CACHE_MS = 15 * 60 * 1000; // 15 min
const cache = new Map<string, { at: number; data: unknown }>();

async function cachedJson<T>(key: string, url: string): Promise<T | null> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data as T;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("ESPN error", res.status, url);
      return null;
    }
    const json = (await res.json()) as T;
    cache.set(key, { at: Date.now(), data: json });
    return json;
  } catch (e) {
    console.error("ESPN fetch failed:", e);
    return null;
  }
}

type EspnLogo = { href: string; rel?: string[] };
type EspnTeam = { id: string; displayName: string; logos?: EspnLogo[]; logo?: string };
type EspnCompetitor = {
  id: string;
  homeAway: "home" | "away";
  team: EspnTeam;
  score?: string;
};
type EspnEvent = {
  id: string;
  date: string;
  competitions: Array<{
    date: string;
    venue?: { fullName?: string };
    competitors: EspnCompetitor[];
    status: { type: { state: string; completed: boolean; description?: string; shortDetail?: string; detail?: string } };
  }>;
  season?: { year: number; displayName?: string; slug?: string };
};

type EspnSchedule = {
  team?: { id: string; displayName: string };
  events?: EspnEvent[];
  seasons?: Array<{ year: number; displayName: string }>;
};

function logoOf(team: EspnTeam): string {
  if (team.logo) return team.logo;
  const full = team.logos?.find((l) => l.rel?.includes("default")) ?? team.logos?.[0];
  return full?.href ?? "";
}

function mapEvent(ev: EspnEvent, leagueName: string): FixtureItem | null {
  const comp = ev.competitions?.[0];
  if (!comp) return null;
  const home = comp.competitors.find((c) => c.homeAway === "home");
  const away = comp.competitors.find((c) => c.homeAway === "away");
  if (!home || !away) return null;
  const isHome = home.team.id === TEAM_ID || home.id === TEAM_ID;
  const opponent = isHome ? away : home;
  const finished = comp.status.type.completed;
  const homeGoals = home.score != null && home.score !== "" ? Number(home.score) : null;
  const awayGoals = away.score != null && away.score !== "" ? Number(away.score) : null;
  return {
    league: ev.season?.displayName ? `${leagueName} · ${ev.season.displayName}` : leagueName,
    leagueLogo: "",
    date: comp.date ?? ev.date,
    homeName: home.team.displayName,
    awayName: away.team.displayName,
    homeLogo: logoOf(home.team),
    awayLogo: logoOf(away.team),
    homeGoals: finished || comp.status.type.state === "in" ? homeGoals : null,
    awayGoals: finished || comp.status.type.state === "in" ? awayGoals : null,
    isHome,
    opponentName: opponent.team.displayName,
    opponentLogo: logoOf(opponent.team),
    venue: comp.venue?.fullName ?? "",
    status: comp.status.type.shortDetail ?? comp.status.type.detail ?? comp.status.type.description ?? "Agendado",
    finished,
  };
}

async function loadFixtures(): Promise<FixtureItem[]> {
  const seasons = [new Date().getUTCFullYear(), new Date().getUTCFullYear() - 1];
  const all: FixtureItem[] = [];
  const seen = new Set<string>();
  for (const league of LEAGUES) {
    for (const year of seasons) {
      const urls = [
        `https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/teams/${TEAM_ID}/schedule?season=${year}`,
        `https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/scoreboard?dates=${year}&limit=1000`,
      ];
      for (const [idx, url] of urls.entries()) {
        const data = await cachedJson<EspnSchedule>(
          `${idx === 0 ? "sched" : "scoreboard"}-${league.slug}-${year}`,
          url,
        );
        for (const ev of data?.events ?? []) {
          const hasTeam = ev.competitions?.[0]?.competitors?.some(
            (c) => c.id === TEAM_ID || c.team.id === TEAM_ID,
          );
          if (!hasTeam || seen.has(ev.id)) continue;
          seen.add(ev.id);
          const item = mapEvent(ev, league.name);
          if (item) all.push(item);
        }
      }
    }
  }
  return all.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

function splitFixtures(items: FixtureItem[]) {
  const now = Date.now();
  const upcoming = items.filter((f) => !f.finished && Date.parse(f.date) >= now - 2 * 60 * 60 * 1000);
  const past = items.filter((f) => f.finished || Date.parse(f.date) < now - 2 * 60 * 60 * 1000);
  return { upcoming, past };
}

export const getNextSportFixture = createServerFn({ method: "GET" }).handler(
  async (): Promise<FixturePayload> => {
    const { upcoming } = splitFixtures(await loadFixtures());
    return { data: upcoming[0] ?? null, error: upcoming.length ? null : "no upcoming fixture" };
  },
);

export const getUpcomingSportFixtures = createServerFn({ method: "GET" }).handler(
  async (): Promise<FixturesPayload> => {
    const { upcoming } = splitFixtures(await loadFixtures());
    return { data: upcoming.slice(0, 5), error: null };
  },
);

export const getRecentSportFixtures = createServerFn({ method: "GET" }).handler(
  async (): Promise<FixturesPayload> => {
    const { past } = splitFixtures(await loadFixtures());
    return { data: past.slice(-5).reverse(), error: null };
  },
);

type EspnStat = { name: string; value: number };
type EspnStandingEntry = { team: EspnTeam; stats: EspnStat[] };
type EspnStandingsResponse = {
  name: string;
  abbreviation: string;
  season?: { year: number; displayName: string };
  children?: Array<{ name: string; standings: { entries: EspnStandingEntry[] } }>;
};

function stat(entry: EspnStandingEntry, name: string): number {
  return entry.stats.find((s) => s.name === name)?.value ?? 0;
}

export const getTeamStandings = createServerFn({ method: "GET" }).handler(
  async (): Promise<StandingsPayload> => {
    const url = `https://site.api.espn.com/apis/v2/sports/soccer/${LEAGUE_SLUG}/standings`;
    const data = await cachedJson<EspnStandingsResponse>("standings", url);
    const entries = data?.children?.[0]?.standings?.entries ?? [];
    if (entries.length === 0) {
      return { data: null, error: "Tabela indisponível no momento" };
    }
    const rows: StandingRow[] = entries
      .map((e) => ({
        rank: stat(e, "rank"),
        teamId: e.team.id,
        teamName: e.team.displayName,
        teamLogo: logoOf(e.team),
        played: stat(e, "gamesPlayed"),
        win: stat(e, "wins"),
        draw: stat(e, "ties"),
        lose: stat(e, "losses"),
        goalsFor: stat(e, "pointsFor"),
        goalsAgainst: stat(e, "pointsAgainst"),
        goalsDiff: stat(e, "pointDifferential"),
        points: stat(e, "points"),
        form: "",
        isTarget: e.team.id === TEAM_ID,
      }))
      .sort((a, b) => a.rank - b.rank);
    return {
      data: {
        leagueId: LEAGUE_SLUG,
        leagueName: data?.children?.[0]?.name ?? "Brasileirão Série A",
        leagueLogo: "",
        season: data?.season?.year ?? new Date().getUTCFullYear(),
        rows,
      },
      error: null,
    };
  },
);

export const __TEAM_NAME = TEAM_NAME;
