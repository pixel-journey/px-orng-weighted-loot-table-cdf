# Security — loot CDF

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty / zero weight / duplicate / bad id | refused |
| Roll outside [0, total) | bad roll |
| Biased U32 tail | reject |
| Bad entropy shape | refused |
| Oversized table | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Oracle delivery | once-resolve dual-callback |
| Admin table edits | config version + auth |
| Economic fairness | publish weights; avoid silent mid-event changes |

No live oracle in this repository.
