# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Entropy delivery |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp |
| [docs.wax.io](https://docs.wax.io/) | WAX development |

**Product facts locked by tests:** exclusive prefix CDFs (`lowerBound` is first index with `cdf[i] > roll`). U32 values in the biased tail are **reject**, not a free low-band win. Never settle a rejected sample.

Table size cap **64** is a teaching bound for RAM/CPU.

## Related labs

| Lab | Topic |
| --- | --- |
| [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) | Independent uint32 windows |
| [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) | Single-modulus game book |
| [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler) | Chained sub-seeds (not CDF bands) |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before roll |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum + reject windows |
