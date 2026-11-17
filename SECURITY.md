# Security — weighted loot CDF

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty / zero weight / duplicate / bad id | refused |
| Roll outside `[0, total)` | bad roll |
| Biased U32 tail | reject |
| Bad entropy shape | refused |
| Oversized table (> 64) | refused |

Exclusive prefix CDFs: `lowerBound` is first index with `cdf[i] > roll`.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Oracle delivery | once-resolve dual-callback |
| Admin table edits | config version + auth; freeze open rolls |
| Economic fairness | publish weights; avoid silent mid-event changes |
| Float weights | forbidden on the contract path |

## Attack angles

1. Inclusive upper bounds that double-count a cut point.
2. `uint32 % total` without rejection (low residues win more).
3. Mutating weights after the table is live without a version bump.
4. Returning "nothing" on reject instead of rerequesting entropy.

## Honesty limits

No live oracle. Related: [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout).
