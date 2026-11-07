# Education

A linear scan of weights is fine for tiny tables. On-chain, a sorted exclusive CDF plus binary search (`lower_bound`) keeps CPU flat as the table grows to 64 entries.

Roll `r` in `0..total-1` lands in entry `i` when `cdf[i-1] <= r < cdf[i]` (with `cdf[-1] = 0`). The implementation finds the first `cdf[i] > r`.

Mapping a raw `uint32` with `% total` is slightly biased unless `total` divides `2^32`. Reject the leftover tail before walking the CDF.
