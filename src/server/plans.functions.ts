import { createServerFn } from "@tanstack/react-start";

const SLUG = "filhasdoalmirante";
const BASE = "https://api.arquibancadadevantagens.com.br";

export type ApiPlanPrice = {
  _id: string;
  nickname: string;
  currency: string;
  amount: number;
  type: string;
  category: string;
  intervalMonths: number;
};

export type ApiPlan = {
  _id: string;
  name: string;
  slug: string;
  benefits?: { items: string[] };
  highlight?: { variant: string | null };
  prices: ApiPlanPrice[];
};

export type PlansPayload = { data: ApiPlan[]; error: string | null };

let cache: { at: number; data: ApiPlan[] } | null = null;
const CACHE_MS = 10 * 60 * 1000;

export const getFandomPlans = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlansPayload> => {
    if (cache && Date.now() - cache.at < CACHE_MS) {
      return { data: cache.data, error: null };
    }
    try {
      const res = await fetch(`${BASE}/website/fandoms/${SLUG}`);
      if (!res.ok) {
        return { data: [], error: `API error ${res.status}` };
      }
      const json = (await res.json()) as { fandom?: { plans?: ApiPlan[] } };
      const plans = json.fandom?.plans ?? [];
      cache = { at: Date.now(), data: plans };
      return { data: plans, error: null };
    } catch (e) {
      console.error("Failed to fetch plans:", e);
      return { data: [], error: "Failed to fetch plans" };
    }
  },
);
