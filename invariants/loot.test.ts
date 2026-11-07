import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_ENTRIES,
  U32_MAX,
  build,
  lowerBound,
  pick,
  pickFromEntropy,
  rollFromUint32,
} from "./loot.ts";

const TABLE = [
  { id: "common", weight: 70 },
  { id: "rare", weight: 25 },
  { id: "legend", weight: 5 },
];

test("build makes exclusive cdf and total", () => {
  const b = build(TABLE);
  assert.deepEqual(b.cdf, [70, 95, 100]);
  assert.equal(b.total, 100);
});

test("pick covers each band", () => {
  const b = build(TABLE);
  assert.equal(pick(b, 0), "common");
  assert.equal(pick(b, 69), "common");
  assert.equal(pick(b, 70), "rare");
  assert.equal(pick(b, 94), "rare");
  assert.equal(pick(b, 95), "legend");
  assert.equal(pick(b, 99), "legend");
});

test("lower_bound is first cdf[i] > roll", () => {
  const b = build(TABLE);
  assert.equal(lowerBound(b.cdf, 0), 0);
  assert.equal(lowerBound(b.cdf, 69), 0);
  assert.equal(lowerBound(b.cdf, 70), 1);
  assert.equal(lowerBound(b.cdf, 94), 1);
  assert.equal(lowerBound(b.cdf, 95), 2);
});

test("out-of-range roll refused", () => {
  const b = build(TABLE);
  assert.throws(() => pick(b, -1), /bad roll/);
  assert.throws(() => pick(b, 100), /bad roll/);
});

test("bad entries refused", () => {
  assert.throws(() => build([]), /bad entries/);
  assert.throws(() => build([{ id: "a", weight: 0 }]), /bad weight/);
  assert.throws(
    () => build([{ id: "a", weight: 1 }, { id: "a", weight: 1 }]),
    /duplicate id/,
  );
  assert.throws(() => build([{ id: "Bad!", weight: 1 }]), /bad id/);
});

test("entry count capped at 64", () => {
  const many = Array.from({ length: MAX_ENTRIES }, (_, i) => ({
    id: "e" + i,
    weight: 1,
  }));
  assert.equal(build(many).total, MAX_ENTRIES);
  assert.throws(
    () =>
      build(
        Array.from({ length: MAX_ENTRIES + 1 }, (_, i) => ({
          id: "e" + i,
          weight: 1,
        })),
      ),
    /bad entries/,
  );
});

test("single entry always wins", () => {
  const b = build([{ id: "only", weight: 42 }]);
  assert.equal(pick(b, 0), "only");
  assert.equal(pick(b, 41), "only");
});

test("rejection tail of 2^32 for total 100", () => {
  const mod = 100n;
  const limit = ((U32_MAX + 1n) / mod) * mod;
  assert.equal(rollFromUint32(limit - 1n, 100), Number((limit - 1n) % mod));
  assert.equal(rollFromUint32(limit, 100), "reject");
  assert.equal(rollFromUint32(U32_MAX, 100), "reject");
});

test("pickFromEntropy maps first 4 bytes", () => {
  const b = build(TABLE);
  assert.equal(pickFromEntropy(b, "00000000" + "11".repeat(28)), "common");
  assert.equal(pickFromEntropy(b, "00000046" + "11".repeat(28)), "rare");
});

test("bad entropy refused", () => {
  const b = build(TABLE);
  assert.throws(() => pickFromEntropy(b, "zz"), /bad entropy/);
  assert.throws(() => pickFromEntropy(b, "abc"), /bad entropy/);
});
