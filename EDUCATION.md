# Education — weighted loot as a CDF

Weights become an exclusive cumulative distribution. A roll in `[0, total)` picks the first band whose exclusive CDF is strictly greater than the roll — the same idea as `lower_bound` on a prefix array.

## Beginner

Table common 70 / rare 25 / legend 5 → CDF `[70, 95, 100]`. Rolls 0–69 common, 70–94 rare, 95–99 legend.

## Intermediate

Unbiased mod: do not take `uint32 % total` over the full 2^32 range. Reject the tail above the largest multiple of total that fits. `pickFromEntropy` reads the first four bytes of a 32-byte hex string.

## Outcomes

1. Build the three-band table and pick boundary rolls.
2. Show empty table / zero weight / duplicate id refusals.
3. Show rejection at the U32 tail for total 100.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
