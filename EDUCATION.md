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

```bash
npm test
```

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

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Treat roll 70 as common | rare (exclusive upper bound) |
| Settle rejected U32 | refused |
| Weight 0 / empty / duplicate id | refused |
| Greedy `weight %` without CDF | wrong product |

---

## Masterclass — table hygiene

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
5. Assuming legend is "5% of rolls" without checking total is 100.

### Exercises

1. Roll 69 vs 70 — which bands? (**common** vs **rare**.)  
2. Why is `uint32 % 100` over all uint32 biased? (`2^32 % 100 ≠ 0`.)  
3. Does this lab call `orng.wax`? (**No**.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Pity counters / guaranteed legend without new tests
- Live oracle auth
- That exclusive CDF is the same as percentage labels in a UI
