import { useEffect, useMemo, useState } from 'react';

const RELEASE_VERSION = 'v0.2.0';
const GENERATED_AT = '2026-03-06';
const FX_RATE = 650_000;

const navItems = [
  ['Home', '#home'],
  ['Results', '#results'],
  ['Scenarios', '#scenarios'],
  ['Ledger', '#ledger'],
  ['Data Gaps', '#data-gaps'],
  ['Sources', '#sources'],
];

const cumulativeOpportunityCost = {
  totalUsd: 13_000_000_000_000,
  rangeMinUsd: 10_000_000_000_000,
  rangeMaxUsd: 15_000_000_000_000,
  asOf: '2026-03',
  claimType: 'estimated',
  confidence: 'estimate',
  source: 'docs/grok-iran-regime-economic-cost-tracker iran-waste-ticker-2026/data/cumulative-waste.json',
};

const cumulativeBreakdown = [
  {
    label: 'Oil & sanctions',
    value: 1_200_000_000_000,
    note: 'Lost export revenue bucket',
  },
  {
    label: 'Proxy / external',
    value: 450_000_000_000,
    note: 'Axis-of-resistance proxy bucket',
  },
  {
    label: 'Nuclear program',
    value: 500_000_000_000,
    note: 'Estimated cumulative burden',
  },
  {
    label: 'Other mismanagement',
    value: 5_000_000_000_000,
    note: 'Largest bucket in repo data',
  },
];

const annualDrainItems = [
  {
    id: 'religious_centers',
    label: 'Religious seminaries service center',
    annualBudgetIrr: 9_500_000_000_000,
    multiplier: 1.5,
    source: 'gemini-Iran_Economic_Simulator_Final_Package/src/data.json',
  },
  {
    id: 'propaganda',
    label: 'Islamic Propaganda Organization',
    annualBudgetIrr: 3_500_000_000_000,
    multiplier: 1.2,
    source: 'gemini-Iran_Economic_Simulator_Final_Package/src/data.json',
  },
  {
    id: 'oil_discount_loss',
    label: 'Estimated oil discount loss to China',
    annualBudgetIrr: 450_000_000_000_000,
    multiplier: 2,
    source: 'gemini-Iran_Economic_Simulator_Final_Package/src/data.json',
  },
];

const corruptionCases = [
  {
    name: 'Debsh Tea scandal',
    amountUsd: 3_700_000_000,
    note: 'Could have built 500 state-of-the-art hospitals.',
    source: 'gemini-IOC_Full_Project_Arsenal/data/corruption_ledger.json',
  },
  {
    name: 'Steel corruption case',
    amountUsd: 3_000_000_000,
    note: 'Listed as a notable case in the blueprint data.',
    source: 'gemini-Iran_Cost_Project_Blueprint/initial_data.json',
  },
];

const scenarioCards = [
  {
    title: 'Sanctions lift only',
    upliftPercent: 82,
    description: 'Long-term GDP growth from removing EU/US sanctions.',
    source: 'grok future-scenarios.json',
  },
  {
    title: 'Catch-up to Turkey productivity',
    upliftPercent: 240,
    description: 'Sanctions lift plus productivity catch-up to Turkey levels.',
    source: 'grok future-scenarios.json',
  },
  {
    title: 'Catch-up to South Korea productivity',
    upliftPercent: 389,
    description: 'Sanctions lift plus productivity catch-up to South Korea levels.',
    source: 'grok future-scenarios.json',
  },
];

const baseModelSample = {
  startYear: 2026,
  startGdpUsd: 100_000_000_000,
  endYear: 2036,
  endGdpUsd: 179_084_769_654,
  startPerCapitaUsd: 1200,
  endPerCapitaUsd: 2149,
  release: 'chatgpt-complete/samples/release/scenarios/base.point.json',
  note: 'Demo-only scenario artifact, useful for wiring the UI to model outputs.',
};

const sourceRows = [
  {
    title: 'RCMA (Majlis Research Center)',
    note: 'Budget laws, research reports, and fiscal evidence to replace provisional budget-drain estimates.',
    tone: 'rose',
  },
  {
    title: 'CBI (Central Bank of Iran)',
    note: 'Baseline macro data, inflation, exchange rates, monetary indicators.',
    tone: 'sky',
  },
  {
    title: 'World Bank Iran data',
    note: 'GDP, population, investment, trade, and benchmark series.',
    tone: 'amber',
  },
  {
    title: 'Transparency International / SIPRI / Iran 2040',
    note: 'Corruption proxies, military spending context, and peer-reviewed benchmark work.',
    tone: 'slate',
  },
];

const dataGaps = [
  'Level 1: GDP, population, investment rate, tax-to-GDP, oil/gas take, trade, FDI.',
  'Level 2: leakage proxies, corruption indices, competition/monopoly proxies, country risk, sanctions intensity.',
  'Level 3: labor participation, unemployment, skilled emigration, diaspora return scenarios.',
  'Level 4: ideological budget lines and defensible reallocation multipliers with ranges.',
  'Level 5: peer-country benchmark panels for validation.',
  'Every new parameter needs source_id or method_note, plus last_updated and confidence.',
];

function formatMoney(value, options = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    notation: options.notation,
  }).format(value);
}

function formatCompactMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value) {
  return `${value.toFixed(0)}%`;
}

function formatIrr(value) {
  return `${formatCompactNumber(value)} IRR`;
}

function App() {
  const [shareFeedback, setShareFeedback] = useState('');

  useEffect(() => {
    if (!shareFeedback) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setShareFeedback('');
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [shareFeedback]);

  const drainLedger = useMemo(() => {
    return annualDrainItems.map(item => ({
      ...item,
      directUsd: item.annualBudgetIrr / FX_RATE,
      weightedUsd: (item.annualBudgetIrr * item.multiplier) / FX_RATE,
    }));
  }, []);

  const weightedAnnualDrainUsd = useMemo(() => {
    return drainLedger.reduce((sum, item) => sum + item.weightedUsd, 0);
  }, [drainLedger]);

  const directIdeologicalBudgetUsd = useMemo(() => {
    return 450_000_000_000_000 / FX_RATE;
  }, []);

  const totalDocumentedCorruptionUsd = useMemo(() => 120_000_000_000, []);

  const modelGrowthPct = useMemo(() => {
    return ((baseModelSample.endGdpUsd - baseModelSample.startGdpUsd) / baseModelSample.startGdpUsd) * 100;
  }, []);

  async function handleShare() {
    const text =
      'Iran Economic Simulator: current repo results snapshot with cumulative cost, corruption totals, budget drains, and scenario outputs.';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Iran Economic Simulator',
          text,
          url: window.location.href,
        });
        setShareFeedback('Shared');
        return;
      } catch {
        setShareFeedback('Share cancelled');
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setShareFeedback('Link copied');
    } catch {
      setShareFeedback('Share unavailable');
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback('URL copied');
    } catch {
      setShareFeedback('Clipboard blocked');
    }
  }

  function handlePost() {
    const text = encodeURIComponent(
      'Iran Economic Simulator results snapshot: cumulative opportunity cost, documented corruption, annual budget drains, and scenario outputs from current repo data.',
    );
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <div className="page-shell">
      <div className="top-strip">
        <div className="top-strip__inner">
          <span className="live-dot" />
          RELEASE {RELEASE_VERSION}
          <span className="separator">|</span>
          IRAN ECONOMIC SIMULATOR
          <span className="separator">|</span>
          GENERATED {GENERATED_AT}
        </div>
      </div>

      <main className="page" id="home">
        <header className="hero">
          <div className="hero-topline">
            <nav className="hero-nav" aria-label="Primary navigation">
              {navItems.map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="lang-pill">FA / EN</div>
          </div>

          <p className="mono-overline">Iran Economic Simulator</p>
          <h1>Current results from the repo, not project README text.</h1>
          <p className="hero-subtitle">
            This page now surfaces working numbers already sitting in the repo:
            cumulative opportunity cost, documented corruption, budget drains,
            and scenario outputs. Many values are still provisional and need a
            stronger source registry.
          </p>

          <div className="hero-links">
            <a href="#results">See results</a>
            <a href="#scenarios">See scenarios</a>
            <a href="#data-gaps">Collect more data</a>
          </div>

          <div className="hero-banner">
            Current local artifacts in use:
            <span>
              cumulative-waste.json, future-scenarios.json, initial_data.json,
              corruption_ledger.json, base.point.json
            </span>
          </div>

          <div className="hero-disclaimer">
            <span>Working snapshot from local repo artifacts</span>
            <span>Mixed confidence and mixed source quality</span>
            <span>Needs stronger official data coverage next</span>
          </div>
        </header>

        <section className="main-counter" id="results">
          <p className="section-kicker">Estimated historical composite</p>
          <h2>Estimated cumulative opportunity cost since 1979</h2>
          <div className="main-counter__amount">
            {formatCompactMoney(cumulativeOpportunityCost.totalUsd)}
          </div>
          <p className="main-counter__subline">
            range {formatCompactMoney(cumulativeOpportunityCost.rangeMinUsd)} –{' '}
            {formatCompactMoney(cumulativeOpportunityCost.rangeMaxUsd)} | as of{' '}
            {cumulativeOpportunityCost.asOf}
          </p>
          <p className="main-counter__caption">
            Current point estimate from the repo&apos;s cumulative-cost artifact.
            This is a composite estimate, not a single audited official series.
          </p>

          <div className="audit-grid">
            <article className="audit-pill">
              <label>Claim type</label>
              <strong>{cumulativeOpportunityCost.claimType}</strong>
            </article>
            <article className="audit-pill">
              <label>Confidence</label>
              <strong>{cumulativeOpportunityCost.confidence}</strong>
            </article>
            <article className="audit-pill">
              <label>Point estimate</label>
              <strong>{formatMoney(cumulativeOpportunityCost.totalUsd)}</strong>
            </article>
            <article className="audit-pill">
              <label>Source file</label>
              <strong>cumulative-waste.json</strong>
            </article>
          </div>

          <div className="countdown-grid">
            {cumulativeBreakdown.map(item => (
              <div className="countdown-cell" key={item.label}>
                <span>{formatCompactMoney(item.value)}</span>
                <label>{item.label}</label>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="rate-grid">
          <article className="rate-card">
            <p>Documented corruption</p>
            <strong>{formatCompactMoney(totalDocumentedCorruptionUsd)}</strong>
            <span>Blueprint total in USD</span>
          </article>
          <article className="rate-card">
            <p>Ideological budget</p>
            <strong>{formatCompactMoney(directIdeologicalBudgetUsd)}</strong>
            <span>Budget law proxy, annual</span>
          </article>
          <article className="rate-card">
            <p>Weighted annual drain</p>
            <strong>{formatCompactMoney(weightedAnnualDrainUsd)}</strong>
            <span>Drain items × multipliers</span>
          </article>
        </section>

        <section className="action-row">
          <button type="button" onClick={handlePost}>
            Post
          </button>
          <button type="button" onClick={handleShare}>
            Share
          </button>
          <button type="button" onClick={handleCopy}>
            Copy Link
          </button>
        </section>

        <p className="feedback-line" aria-live="polite">
          {shareFeedback || 'Current snapshot is still provisional and needs more official source coverage.'}
        </p>

        <section className="page-section" id="scenarios">
          <h2 className="section-heading">Scenario outputs already in the repo</h2>
          <div className="proof-grid">
            {scenarioCards.map(card => (
              <article className="proof-card" key={card.title}>
                <p className="section-kicker">Scenario</p>
                <h3>{card.title}</h3>
                <strong>{formatPercent(card.upliftPercent)}</strong>
                <div className="proof-meta">
                  <span>Type · scenario</span>
                  <span>Confidence · speculative</span>
                  <span>{card.description}</span>
                  <span>Source · {card.source}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Model sample output currently available</h2>
          <div className="impact-grid">
            <article className="impact-card impact-card--sky">
              <p className="section-kicker">Base sample</p>
              <h3>{baseModelSample.startYear} GDP</h3>
              <strong>{formatCompactMoney(baseModelSample.startGdpUsd)}</strong>
              <span>Start of the demo release series</span>
            </article>
            <article className="impact-card impact-card--amber">
              <p className="section-kicker">Base sample</p>
              <h3>{baseModelSample.endYear} GDP</h3>
              <strong>{formatCompactMoney(baseModelSample.endGdpUsd)}</strong>
              <span>End of the 10-year demo horizon</span>
            </article>
            <article className="impact-card impact-card--rose">
              <p className="section-kicker">Base sample</p>
              <h3>10-year GDP lift</h3>
              <strong>{formatPercent(modelGrowthPct)}</strong>
              <span>{formatMoney(baseModelSample.startPerCapitaUsd)} → {formatMoney(baseModelSample.endPerCapitaUsd)} per capita</span>
            </article>
          </div>
        </section>

        <section className="page-section" id="ledger">
          <h2 className="section-heading">Annual drain ledger from current repo data</h2>
          <article className="table-card ledger-table">
            <div className="ledger-row ledger-row--head">
              <span>Item</span>
              <span>Annual IRR</span>
              <span>Direct USD</span>
              <span>Weighted USD</span>
            </div>
            {drainLedger.map(item => (
              <div className="ledger-row" key={item.id}>
                <strong>{item.label}</strong>
                <span>{formatIrr(item.annualBudgetIrr)}</span>
                <span>{formatCompactMoney(item.directUsd)}</span>
                <span>{formatCompactMoney(item.weightedUsd)}</span>
              </div>
            ))}
          </article>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Documented corruption cases</h2>
          <div className="trust-grid">
            {corruptionCases.map(caseItem => (
              <article className="trust-card" key={caseItem.name}>
                <p className="section-kicker">Case</p>
                <h3>{caseItem.name}</h3>
                <div className="case-amount">{formatMoney(caseItem.amountUsd)}</div>
                <p>{caseItem.note}</p>
                <p className="source-footnote">Source: {caseItem.source}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">What we still need to collect</h2>
          <div className="missing-grid" id="data-gaps">
            {dataGaps.map(item => (
              <article className="missing-card" key={item}>
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="sources">
          <h2 className="section-heading">Source pack to ingest next</h2>
          <article className="sources-card source-table">
            {sourceRows.map(source => (
              <div className="source-row" key={source.title}>
                <div className="source-main">
                  <p className="source-id">Next source</p>
                  <strong>{source.title}</strong>
                  <span>{source.note}</span>
                </div>
                <div className="source-meta">
                  <span className={`source-chip source-chip--${source.tone}`}>priority</span>
                </div>
              </div>
            ))}
          </article>
        </section>

        <section className="page-section">
          <article className="footer-cta">
            <p className="section-kicker">Next pass</p>
            <h3>Collect stronger official data, then replace provisional buckets.</h3>
            <p>
              The right next move is not more project-description copy. It is a
              data-ingestion pass for GDP, population, oil exports, investment,
              tax-to-GDP, sanctions intensity, and validated budget lines.
            </p>
            <a href="#sources">See next source pack</a>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
