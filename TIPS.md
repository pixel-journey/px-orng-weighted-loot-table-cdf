# Tips — weighted CDF loot

## Do

- Build exclusive prefix CDFs; document the half-open intervals.  
- Reject the U32 tail; never settle a biased sample.  
- Cap table size (here 64) for RAM/CPU.  
- Keep ids stable strings your UI and chain rows share.

## Don't

- Use floating-point weights in the contract path.  
- Change band order without regenerating CDF and retesting boundaries.  
- Treat entropy as optional after the drop is economically final.

## Related

[byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
