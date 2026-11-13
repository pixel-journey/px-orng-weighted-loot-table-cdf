# Tips — weighted tables

- Keep weights integers; document percentages as `weight/total`.
- Cap entry count (64 here) for CPU/RAM.
- Never map `hash % total` without a rejection plan when total is awkward.
- Related: [byte slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll), [Fisher–Yates](https://github.com/pixel-journey/px-orng-fisher-yates-deck-shuffler).
