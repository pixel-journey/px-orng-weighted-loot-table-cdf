# Weighted loot via cumulative distribution

> **Domain:** WAX ORNG — weighted loot table  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Build an exclusive CDF from positive integer weights. A roll in `0..total-1` maps to the first entry where `cdf[i] > roll` (`lower_bound` style). Entropy draws use the rejection tail of `2^32` so the total is not biased.

**Code under test:** `npm test`. No live `orng.wax`, no wasm.

**Official RNG:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

```bash
npm test
```

MIT — Pixel Journey
