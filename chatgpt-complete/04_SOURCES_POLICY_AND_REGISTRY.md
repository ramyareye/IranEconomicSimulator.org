# Sources Policy and Registry (Super Detailed)

If this project fails, it will fail here: **sources**.

Canonical reference: `codex/SOURCE_POLICY.md`.

## 1) Why a source registry exists

You want:
- traceability (any number → sources)
- challengeability (any source → check → dispute if needed)
- defensibility (journalists can audit quickly)
- longevity (URLs break; metadata survives)

So every cited thing becomes a registry entry with:
- stable `id`
- publisher
- publication date (if known)
- retrieval date
- tier and reliability
- bias note (when relevant)
- license/reuse notes (when relevant)

## 2) Tier definitions (A–D)

- **Tier A**: primary institutional datasets and official multilateral sources (highest baseline trust)
- **Tier B**: peer-reviewed research, reproducible academic studies
- **Tier C**: think tanks, investigative orgs, high-quality reports with methods
- **Tier D**: media-only, commentary, secondary reporting (never a sole support for high-impact claims)

Rule:
- Headline metrics prefer Tier A/B.
- Tier D can support context, but usually cannot anchor a large quantitative claim alone.

## 3) Reliability (separate from tier)

Recommended values:
- `high` — clear methods and/or primary data; stable publisher
- `medium` — useful but needs cross-check; assumptions present
- `low` — use cautiously; not for headline metrics

Tier and reliability are correlated but not identical.

## 4) Source registry entry contract (expanded)

Minimum fields (canonical + recommended):

```json
{
  "id": "SRC.DEMO.EXAMPLE.2026",
  "title": "Title of the dataset/report/page",
  "url": "https://example.com",
  "publisher": "Publisher name",
  "published_at": "YYYY-MM-DD or null",
  "retrieved_at": "YYYY-MM-DD",
  "tier": "A|B|C|D",
  "reliability": "high|medium|low",
  "bias_note": "Short note or null",
  "license_or_reuse_note": "Short note or null",
  "notes": "Anything else useful for auditing (table name, series id, etc.)"
}
```

Rules:
- Don’t invent fields you don’t know. If unknown: set to `null` and add a note.
- Store the most audit-useful “locator” info in `notes` (table ID, series code, page section).

## 5) Citation rules (what each metric/event must do)

Per metric/event:
- include at least one concrete `source_id`
- avoid generic sources
- if sources disagree:
  - show a range
  - explain the difference
  - choose a conservative baseline for headlines

## 6) How to cite “derived” or “estimated” numbers

### For `derived`

You must cite the sources of all inputs and show the formula.
Example:
- inputs: `IMF GDP series`, `population series`
- formula: `GDP per capita = GDP / population`

### For `estimated`

You must cite:
- the sources for the proxy inputs (if any)
- the methodological basis (paper/report describing the method)
- and show uncertainty

## 7) Handling broken links and deprecations

URLs rot. That is normal.

Deprecation policy (recommended):
- keep the source entry
- mark `deprecated: true` (if you add such a field later)
- link replacement source IDs in notes
- avoid deleting the old source; history matters

## 8) Conflict resolution workflow (practical)

When two sources conflict:

1. Write down both values with their definitions (units, dates, scope).
2. Check for “definition mismatch” first (PPP vs nominal; calendar vs fiscal year; series breaks).
3. If still conflicting:
   - widen uncertainty
   - reduce confidence
   - pick conservative baseline for headline
4. Record the decision in changelog or PR notes.

## 9) Samples you can copy/paste

- Minimal registry entries (demo): `chatgpt-complete/samples/release/sources.json`
- How metrics reference sources: `chatgpt-complete/samples/release/metrics.json`
- How events reference sources: `chatgpt-complete/samples/release/timeline.json`

