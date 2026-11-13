# Worked examples — loot CDF

## Example A — build

```text
build([
  { id: "common", weight: 70 },
  { id: "rare", weight: 25 },
  { id: "legend", weight: 5 },
])
// total 100, cdf [70, 95, 100]
```

## Example B — lower_bound picks

| roll | id |
| --- | --- |
| 0..69 | common |
| 70..94 | rare |
| 95..99 | legend |

## Example C — bad inputs

Empty list, weight 0, duplicate id, total overflow → refused.

## Example D — rejection

When `uint32 >= floor(2^32 / total) * total`, `rollFromUint32` returns `"reject"`.

## Example E — entropy helper

`pickFromEntropy(built, hex)` reads first 8 hex chars as uint32, then pick or reject.
