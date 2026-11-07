/**
 * Weighted loot table via cumulative distribution (educational).
 * Walk with lower_bound semantics. No live orng.wax. No wasm.
 */

export const MAX_ENTRIES = 64;
export const U32_MAX = 0xffffffffn;

export type Entry = {
  id: string;
  weight: number;
};

export type Built = {
  entries: Entry[];
  cdf: number[];
  total: number;
};

const NAME = /^[a-z0-9_]{1,32}$/;

export function build(entries: Entry[]): Built {
  if (!Array.isArray(entries) || entries.length < 1 || entries.length > MAX_ENTRIES) {
    throw new Error("bad entries");
  }
  const seen = new Set<string>();
  const cleaned: Entry[] = [];
  let total = 0;
  for (const e of entries) {
    if (!NAME.test(e.id)) throw new Error("bad id");
    if (seen.has(e.id)) throw new Error("duplicate id");
    if (!Number.isInteger(e.weight) || e.weight < 1 || e.weight > 1_000_000) {
      throw new Error("bad weight");
    }
    seen.add(e.id);
    cleaned.push({ id: e.id, weight: e.weight });
    total += e.weight;
    if (total > 1_000_000_000) throw new Error("total overflow");
  }
  const cdf: number[] = [];
  let run = 0;
  for (const e of cleaned) {
    run += e.weight;
    cdf.push(run);
  }
  return { entries: cleaned, cdf, total };
}

/**
 * lower_bound on cdf: first index where cdf[i] > roll (roll in 0..total-1).
 */
export function lowerBound(cdf: number[], roll: number): number {
  if (!Number.isInteger(roll) || roll < 0) throw new Error("bad roll");
  let lo = 0;
  let hi = cdf.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cdf[mid]! <= roll) lo = mid + 1;
    else hi = mid;
  }
  if (lo >= cdf.length) throw new Error("roll out of range");
  return lo;
}

export function pick(built: Built, roll: number): string {
  if (!Number.isInteger(roll) || roll < 0 || roll >= built.total) {
    throw new Error("bad roll");
  }
  const i = lowerBound(built.cdf, roll);
  return built.entries[i]!.id;
}

export function rollFromUint32(value: bigint, total: number): number | "reject" {
  if (value < 0n || value > U32_MAX) throw new Error("bad uint32");
  if (!Number.isInteger(total) || total < 1 || total > 1_000_000_000) {
    throw new Error("bad total");
  }
  const mod = BigInt(total);
  const limit = ((U32_MAX + 1n) / mod) * mod;
  if (value >= limit) return "reject";
  return Number(value % mod);
}

export function pickFromEntropy(built: Built, entropyHex: string): string | "reject" {
  const hex = entropyHex.toLowerCase();
  if (!/^[0-9a-f]{8,64}$/.test(hex)) throw new Error("bad entropy");
  const value = BigInt("0x" + hex.slice(0, 8));
  const roll = rollFromUint32(value, built.total);
  if (roll === "reject") return "reject";
  return pick(built, roll);
}
