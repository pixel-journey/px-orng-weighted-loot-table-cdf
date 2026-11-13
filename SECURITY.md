# Security notes — loot CDF

| Mitigated | Behavior |
| --- | --- |
| Bad weights / ids | refused |
| Roll out of range | refused |
| Biased mod | reject tail |
| Entry count | max 64 |

Production: freeze table hash on-chain; oracle once-only resolve; do not let clients supply weights at open time without governance.
