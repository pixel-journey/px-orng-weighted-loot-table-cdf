# Education — weighted loot as a CDF

> **Rung:** `npm test` passes. Entropy is a hex **argument**. No `orng.wax` broadcast.  
> **The test is the rule.**

Weights become an **exclusive cumulative distribution**. A roll in `[0, total)` picks the first band whose exclusive CDF is **strictly greater** than the roll — the same idea as `lower_bound` on a prefix array in C++.

Infra first: [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) → [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent). Sampling helpers: [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll).

Official RNG context: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Build common/rare/legend CDF and name boundary rolls |
| Intermediate | Unbiased mod + reject the U32 tail |
| Masterclass | Why greedy weight% is wrong; empty/zero/duplicate refusals |

---

## Beginner — three bands

| id | weight | exclusive CDF |
| --- | --- | --- |
| common | 70 | 70 |
| rare | 25 | 95 |
| legend | 5 | 100 |

`build` stores `[70, 95, 100]`, `total = 100`.

| Roll | Band |
| --- | --- |
| 0 and 69 | common |
| 70 and 94 | rare |
| 95 and 99 | legend |
| -1 or 100 | `bad roll` |

A single entry of weight 42 wins for rolls `0..41` only.

### Words

| Word | Meaning |
| --- | --- |
| Exclusive CDF | Prefix sums; band i is `[prev, cdf[i])` |
| lower_bound idea | First index with `cdf[i] > roll` |
| total | Sum of weights; roll domain is `[0, total)` |

---

## Intermediate — unbiased reduction

**Do not** use `uint32 % total` over the full `2^32` range when `2^32 % total != 0`. That biases low residues.

Accept only values below the largest multiple of `total` that fits in `2^32`. At that limit and at `U32_MAX`, `rollFromUint32` returns `"reject"` — request new entropy; do not settle a loot drop on a biased sample.

`pickFromEntropy` reads the **first 4 bytes** of a 32-byte hex string:

| Prefix | Result |
| --- | --- |
| `00000000` | common |
| `00000046` | rare (`0x46` = 70, start of rare band) |

`zz` and odd-length `abc` → `bad entropy`.

---

## Masterclass — table hygiene and product angles

### Refusals (tested)

| Input | Error |
| --- | --- |
| empty table | bad entries |
| weight 0 | bad weight |
| duplicate id | duplicate id |
| id `Bad!` | bad id |
| more than 64 rows | bad entries |

### Common student mistakes

1. Treating roll `70` as still common (it is the first rare).  
2. Using inclusive upper bounds and double-counting boundaries.  
3. Settling on a rejected U32 sample.  
4. Building weights that sum to 0.  
5. Assuming legend is "5% of rolls" without checking total is 100 — it is 5/100 only because total is 100.

### Nice-to-have product extensions (not in this repo)

- Pity counters (force rare after N commons) — new state machine + tests.  
- Guaranteed legend on first open — separate table or override path.  
- Multi-roll from one checksum — [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll).  
- On-chain table updates under config version — [invariant-kit](https://github.com/pixel-journey/px-invariant-kit) `version.ts`.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Roll 69 vs 70 — which bands?  
2. Why is `uint32 % 100` over all uint32 biased?  
3. Does this lab call `orng.wax`? (No.)
