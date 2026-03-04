# Model (EN) — v0.1

## Scenario
A scenario is a parameter set.

### GDP growth
GDP_t = GDP_{t-1} * (1 + g_t)

g_t = sum of modules:
- g_base, g_trade, g_governance, g_competition, g_capital, g_talent, g_oil (+ optional shocks)

## Government revenue
Rev_t = Tax_t + OilRev_t + Customs_t + SOE_t - Leakage_t
Tax_t = tax_to_gdp_t * GDP_t

The purpose of v0.1 is modular transparency, not final accuracy.
