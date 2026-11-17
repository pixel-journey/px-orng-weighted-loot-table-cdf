# Tips — weighted CDF loot

## Do

- Build **exclusive** prefix CDFs. Document the half-open intervals (`[lo, hi)`).
- Reject the U32 tail so the modular map is unbiased. Never settle a biased sample.
- Cap table size (here **64**) for RAM/CPU.
- Keep item ids as stable strings your UI and chain rows share.

## Don't

- Use floating-point weights on the contract path.
- Change band order without regenerating the CDF and retesting every boundary.
- Treat entropy as optional after the drop is economically final.

## Common mistakes

1. Inclusive upper bounds that double-count a cut point.
2. `roll % totalWeight` without rejection (low residues win more often).
3. Mutating weights after the table is live without a version bump and a freeze on open rolls.
4. Returning "nothing" on reject instead of rerequesting entropy.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Guaranteed pity timer | Counter beside the CDF; new tests |
| Multi-roll from one seed | [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) |
| On-chain weight governance | Config version + msig |

Related: [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
