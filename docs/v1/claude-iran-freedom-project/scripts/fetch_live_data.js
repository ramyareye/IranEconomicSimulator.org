#!/usr/bin/env node
/**
 * fetch_live_data.js
 * Fetches live exchange rates, oil prices, etc. and creates a daily snapshot
 */

const fs = require('fs');
const path = require('path');

const SNAPSHOT_DIR = path.join(__dirname, '..', 'data', 'live', 'snapshots');

// Ensure snapshot dir exists
if (!fs.existsSync(SNAPSHOT_DIR)) {
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
}

async function fetchOilPrice() {
  try {
    // Yahoo Finance - Brent Crude
    const url = 'https://query1.finance.yahoo.com/v8/finance/chart/BZ%3DF?interval=1d&range=1d';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return { value: price, source: 'yahoo_finance', currency: 'USD', unit: 'per_barrel' };
  } catch (e) {
    console.warn('Oil price fetch failed:', e.message);
    return null;
  }
}

async function fetchUSDIRR() {
  try {
    // Bonbast.com - open market rate
    // Note: this may need adjustment based on their actual API
    const res = await fetch('https://bonbast.com/json', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://bonbast.com/'
      }
    });
    const data = await res.json();
    // Bonbast returns USD buy/sell rates
    const usd_buy = data?.usd?.[0];
    const usd_sell = data?.usd?.[1];
    return {
      buy: usd_buy,
      sell: usd_sell,
      mid: usd_buy && usd_sell ? Math.round((usd_buy + usd_sell) / 2) : null,
      source: 'bonbast_com',
      unit: 'IRR_per_USD',
      note: 'open_market_rate_not_official_CBI'
    };
  } catch (e) {
    console.warn('USD/IRR fetch failed:', e.message);
    return null;
  }
}

async function fetchGoldPrice() {
  try {
    // Yahoo Finance - Gold futures
    const url = 'https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF?interval=1d&range=1d';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return { value: price, source: 'yahoo_finance', currency: 'USD', unit: 'per_troy_oz' };
  } catch (e) {
    console.warn('Gold price fetch failed:', e.message);
    return null;
  }
}

async function main() {
  console.log('🔄 Fetching live data...');
  
  const [oilPrice, usdIrr, goldPrice] = await Promise.all([
    fetchOilPrice(),
    fetchUSDIRR(),
    fetchGoldPrice()
  ]);

  const timestamp = new Date().toISOString();
  const dateStr = timestamp.split('T')[0];

  const snapshot = {
    timestamp,
    date: dateStr,
    data: {
      oil_price_brent: oilPrice,
      usd_irr_open_market: usdIrr,
      gold_price_usd: goldPrice,
    },
    // Derived calculations
    derived: {
      rial_devaluation_factor: usdIrr?.mid 
        ? Math.round(usdIrr.mid / 70)  // 70 IRR was 1 USD in 1978
        : null,
      note: "Devaluation factor = current rate / 70 (1978 baseline)"
    },
    metadata: {
      version: '1.0',
      sources: ['bonbast_com', 'yahoo_finance'],
      disclaimer: 'USD/IRR is open market (unofficial) rate. CBI official rate is lower.'
    }
  };

  // Save dated snapshot
  const snapshotPath = path.join(SNAPSHOT_DIR, `${dateStr}.json`);
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));
  console.log(`✅ Snapshot saved: ${snapshotPath}`);

  // Also save as "latest.json"
  const latestPath = path.join(SNAPSHOT_DIR, '..', 'latest.json');
  fs.writeFileSync(latestPath, JSON.stringify(snapshot, null, 2));
  console.log(`✅ Latest updated: ${latestPath}`);

  // Print summary
  console.log('\n📊 Live Data Summary:');
  if (oilPrice?.value) console.log(`   🛢️  Brent Oil: $${oilPrice.value.toFixed(2)}/bbl`);
  if (usdIrr?.mid) console.log(`   💵 USD/IRR: ${usdIrr.mid.toLocaleString()} (open market)`);
  if (goldPrice?.value) console.log(`   🥇 Gold: $${goldPrice.value.toFixed(2)}/oz`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
