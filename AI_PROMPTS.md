# AI handoff — weighted loot table CDF

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Entropy delivery |
| [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) | Independent uint32 windows |
| [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) | Chained sub-seeds (not CDF) |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before roll |

## Non-negotiables

1. Exclusive prefix CDFs: `lowerBound` is first index with `cdf[i] > roll`.
2. U32 values in the **biased tail** are **reject**, not a free low-band win.
3. Never settle a rejected sample.
4. Table size cap **64** is a teaching bound for RAM/CPU, not a chain law.
5. Once-resolve entropy before rolling. `orng.wax` is WAX-only.
6. No broadcast in this pure lab.

## Prompt seeds

- "Show lowerBound pick for a sample CDF and roll."
- "Biased tail U32 — reject or low-band win?"
- "Contrast CDF bands with Fisher–Yates deck indices."
- "Cap 64 rows — teaching bound or consensus?"

## Do not

- Settle rejected tail as the first band.
- Merge with deck shuffle logic.
- Claim live orng from this pure table.
