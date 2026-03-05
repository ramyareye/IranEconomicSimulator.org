# Prompt Playbook (Templates)

These templates are designed to reduce hallucinations and produce outputs that can be migrated into the canonical data/docs system.

## A) Create a source registry entry (from a URL)

Paste:
- URL
- the snippet you want cited (or a summary of the relevant table/figure)
- retrieved date (YYYY-MM-DD)

Prompt:
“Create a source registry entry for the project. Do not invent missing fields; if unknown, set them to `null` and tell me what to look up. Output JSON only.”

Expected output shape:
```json
{
  "id": "TBD",
  "title": "…",
  "url": "…",
  "publisher": "…",
  "published_at": "YYYY-MM-DD or null",
  "retrieved_at": "YYYY-MM-DD",
  "tier": "A|B|C|D",
  "reliability": "high|medium|low",
  "bias_note": "… or null",
  "license_or_reuse_note": "… or null",
  "notes": "… or null"
}
```

## B) Draft a metric entry (observed)

Paste:
- source IDs (already in the registry)
- value + unit + as_of date
- bilingual titles (or ask for translation)

Prompt:
“Draft one metric entry following the canonical contract. Output JSON only. If anything required is missing, stop and list the missing fields.”

Expected output shape:
```json
{
  "id": "metric.example",
  "title": { "fa": "…", "en": "…" },
  "category": "…",
  "subcategory": "…",
  "value": 0,
  "unit": "…",
  "as_of": "YYYY-MM-DD",
  "claim_type": "observed",
  "confidence": "high",
  "sources": ["SRC_ID_1"],
  "method_note": "One sentence describing what the value represents.",
  "uncertainty": null,
  "version": "0.1.0"
}
```

## C) Draft a derived metric (show your work)

Paste:
- input metric IDs + values + dates
- the formula (explicit)

Prompt:
“Compute this derived metric using the formula I provide. Output: (1) JSON metric entry (claim_type=derived), (2) a short method note that lists inputs and formula. Do not add new sources.”

## D) Draft a timeline event entry

Paste:
- date (or date range)
- bilingual titles/descriptions (or ask for translation)
- specific source IDs

Prompt:
“Create one timeline event entry in JSON using the canonical event contract. Use neutral language and keep it factual. Output JSON only.”

## E) Translate EN↔FA with parity check

Paste:
- the source text

Prompt:
“Translate this text to Persian (FA). Keep meaning identical, preserve numbers/units/dates, and output: (1) translated text, (2) a short checklist of any ambiguous phrases that could drift in meaning.”

## F) Convert a rough draft into canonical doc style

Paste:
- the draft text
- target file name under `codex/` (or `chatgpt/`)

Prompt:
“Rewrite this into the project’s canonical doc tone: clear headings, short sections, enforce claim/confidence terminology, avoid absolute certainty. Keep it concise. Output Markdown only.”

