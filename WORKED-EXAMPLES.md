# Worked examples — weighted loot CDF

Table used by the tests:

| id | weight | exclusive CDF |
| --- | --- | --- |
| common | 70 | 70 |
| rare | 25 | 95 |
| legend | 5 | 100 |

`build` stores `[70, 95, 100]` and `total` `100`. `lowerBound` is the first index with `cdf[i] > roll`.

| Roll | Band |
| --- | --- |
| `0` and `69` | common |
| `70` and `94` | rare |
| `95` and `99` | legend |
| `-1` or `100` | `bad roll` |

A single entry of weight `42` wins for rolls `0` and `41`.

## Refusals

| Input | Error |
| --- | --- |
| empty table | bad entries |
| weight `0` | bad weight |
| duplicate id `a` | duplicate id |
| id `Bad!` | bad id |
| `MAX_ENTRIES + 1` rows (`MAX_ENTRIES` is 64) | bad entries |
| 64 rows of weight 1 | total `64` |

## Unbiased mod

For total `100`, `rollFromUint32` accepts values below the largest multiple of 100 that fits in `2^32`, and returns `"reject"` at that limit and at `U32_MAX`. That is the rejection tail: do not use `uint32 % 100` on the whole range.

## Entropy

`pickFromEntropy` reads the first 4 bytes of a 32-byte hex string.

| Prefix | Result |
| --- | --- |
| `00000000` | common |
| `00000046` | rare (`0x46` is 70, the start of the rare band) |

`zz` and odd-length `abc` are `bad entropy`.

No `orng.wax` call. The hex string is an argument.
