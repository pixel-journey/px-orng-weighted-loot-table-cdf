# Security

| Surface | Closed by |
| --- | --- |
| Zero or negative weight | refused |
| Duplicate ids | refused |
| Empty or >64 entries | refused |
| Roll outside 0..total-1 | refused |
| Modulo bias on total | rejection tail of 2^32 |

Not claimed: live ORNG delivery, pack unbox flow, wasm.
