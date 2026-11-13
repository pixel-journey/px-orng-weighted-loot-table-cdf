# Education — weighted loot CDF

> **Rung:** `npm test` passes. No live `orng.wax`.  
> Use after you have a resolved entropy string from the ORNG infra labs.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Build exclusive CDF from positive weights |
| Intermediate | `lower_bound`: first `cdf[i] > roll` |
| Masterclass | Rejection sampling so `total` does not bias the modulus |

## Beginner

Entries `{ id, weight }`. CDF is running sum of weights. `total` is the last CDF value. A fair roll is an integer in `0..total-1`.

## Intermediate

`pick(built, roll)` finds the first index where cumulative weight exceeds `roll`. Example: weights 1, 3, 6 → cdf `[1,4,10]`; roll `0` → first; roll `3` → second; roll `4..9` → third.

## Masterclass

`rollFromUint32` uses rejection of the top of the `2^32` range so `value % total` is unbiased when `total` does not divide `2^32`. Returning `"reject"` means request new entropy, not force a bucket.

## Will not teach

Minting the loot NFT, bank economy, or oracle delivery (see dice / dual-callback).
