# Weighted loot via cumulative distribution

> **Domain:** WAX ORNG — weighted loot table  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Exclusive CDF from positive weights. Roll in `0..total-1` maps with **lower_bound** (`first cdf[i] > roll`). Uint32 draws use a rejection tail so the modulus is unbiased.

**Code under test:** `npm test`. No live `orng.wax`.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Build, pick, reject |
| [TIPS.md](TIPS.md) | Weights and bias |
| [SECURITY.md](SECURITY.md) | Table integrity |
| [SOURCES.md](SOURCES.md) | Official + related |

```bash
npm test
```

MIT — Pixel Journey
