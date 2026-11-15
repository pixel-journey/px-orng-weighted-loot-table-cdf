# Tips

- CDF values in this lab are **exclusive** upper bounds. Roll `70` is rare, not common, because `70` is not `< 70`.
- Build the CDF once per table version. Do not recompute weights with floats.
- Reject and re-request when `rollFromUint32` returns `"reject"`. Folding the tail with `% total` biases the low residues.
- Cap the table at 64. A longer list is a CPU and RAM problem on chain, and the test already refuses it.
- Ids are a teaching charset. They are not AtomicAssets template ids.
