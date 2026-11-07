# px-orng-weighted-loot-table-cdf

> **Trust:** private educational lab (Tier B)  
> **Quest:** 009 — weighted loot via cumulative distribution  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Build an exclusive CDF from positive integer weights. A roll in `0..total-1` maps to the first entry where `cdf[i] > roll` (`lower_bound`). Entropy draws use the rejection tail of `2^32` so the total is not biased.

**Real code:** `npm test`. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
