#!/usr/bin/env node
/**
 * validate.js — Iran Freedom Project Data Validator
 * 
 * Validates all JSON data files for:
 * - Valid JSON syntax
 * - Required fields present
 * - Source references exist in bibliography
 * - Confidence levels valid
 * - No orphan source IDs
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SOURCES_FILE = path.join(DATA_DIR, 'sources', 'bibliography.json');

const VALID_CONFIDENCE = ['high', 'medium', 'estimate', 'speculative'];
const VALID_DIRECTIONS = ['positive', 'negative', 'neutral'];
const VALID_CATEGORIES = ['macroeconomics', 'human_capital', 'military', 'social', 'civil_liberties'];

let errors = [];
let warnings = [];
let validSources = new Set();

function log(type, file, msg) {
  const entry = `[${type}] ${path.basename(file)}: ${msg}`;
  if (type === 'ERROR') {
    errors.push(entry);
    console.error(`❌ ${entry}`);
  } else if (type === 'WARN') {
    warnings.push(entry);
    console.warn(`⚠️  ${entry}`);
  } else {
    console.log(`✅ ${entry}`);
  }
}

// Load valid source IDs
function loadSources() {
  try {
    const data = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
    validSources = new Set(Object.keys(data.sources));
    log('OK', SOURCES_FILE, `Loaded ${validSources.size} valid source IDs`);
  } catch (e) {
    log('ERROR', SOURCES_FILE, `Failed to load sources: ${e.message}`);
    process.exit(1);
  }
}

// Validate a metric object
function validateMetric(metric, file, index) {
  const prefix = `metric[${index}] id="${metric.id || 'MISSING'}"`;

  // Required fields
  const required = ['id', 'category', 'title', 'value', 'unit', 'direction', 'confidence', 'sources'];
  for (const field of required) {
    if (metric[field] === undefined || metric[field] === null) {
      log('ERROR', file, `${prefix}: missing required field "${field}"`);
    }
  }

  // Title structure
  if (metric.title) {
    if (!metric.title.fa) log('ERROR', file, `${prefix}: missing title.fa`);
    if (!metric.title.en) log('ERROR', file, `${prefix}: missing title.en`);
  }

  // Validate confidence
  if (metric.confidence && !VALID_CONFIDENCE.includes(metric.confidence)) {
    log('ERROR', file, `${prefix}: invalid confidence "${metric.confidence}". Must be: ${VALID_CONFIDENCE.join(', ')}`);
  }

  // Validate direction
  if (metric.direction && !VALID_DIRECTIONS.includes(metric.direction)) {
    log('ERROR', file, `${prefix}: invalid direction "${metric.direction}". Must be: ${VALID_DIRECTIONS.join(', ')}`);
  }

  // Validate sources exist in bibliography
  if (metric.sources && Array.isArray(metric.sources)) {
    for (const source of metric.sources) {
      if (source !== 'own_calculation' && !validSources.has(source)) {
        log('WARN', file, `${prefix}: source "${source}" not found in bibliography.json`);
      }
    }
  }

  // Warn about speculative numbers
  if (metric.confidence === 'speculative') {
    log('WARN', file, `${prefix}: marked as speculative — ensure description is clear about uncertainty`);
  }

  // Check live metrics have source_url
  if (metric.is_live === true && !metric.live_source_url) {
    log('WARN', file, `${prefix}: is_live=true but no live_source_url specified`);
  }
}

// Validate a metrics JSON file
function validateMetricsFile(filePath) {
  console.log(`\n📋 Validating: ${path.relative(DATA_DIR, filePath)}`);
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    log('ERROR', filePath, `Invalid JSON: ${e.message}`);
    return;
  }

  if (!data._meta) {
    log('WARN', filePath, 'Missing _meta object');
  }

  if (!data.metrics || !Array.isArray(data.metrics)) {
    log('ERROR', filePath, 'Missing or invalid "metrics" array');
    return;
  }

  // Check for duplicate IDs
  const ids = data.metrics.map(m => m.id).filter(Boolean);
  const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (duplicates.length > 0) {
    log('ERROR', filePath, `Duplicate metric IDs: ${duplicates.join(', ')}`);
  }

  data.metrics.forEach((metric, index) => validateMetric(metric, filePath, index));
  log('OK', filePath, `Validated ${data.metrics.length} metrics`);
}

// Validate events timeline
function validateTimeline(filePath) {
  console.log(`\n📋 Validating: ${path.relative(DATA_DIR, filePath)}`);
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    log('ERROR', filePath, `Invalid JSON: ${e.message}`);
    return;
  }

  if (!data.events || !Array.isArray(data.events)) {
    log('ERROR', filePath, 'Missing or invalid "events" array');
    return;
  }

  data.events.forEach((event, index) => {
    const prefix = `event[${index}] id="${event.id || 'MISSING'}"`;
    const required = ['id', 'date', 'title', 'type', 'impact_level', 'description'];
    for (const field of required) {
      if (!event[field]) {
        log('ERROR', filePath, `${prefix}: missing required field "${field}"`);
      }
    }
    if (event.sources) {
      for (const source of event.sources) {
        if (!validSources.has(source)) {
          log('WARN', filePath, `${prefix}: source "${source}" not in bibliography`);
        }
      }
    }
  });

  log('OK', filePath, `Validated ${data.events.length} events`);
}

// Main
function main() {
  console.log('🔍 Iran Freedom Project — Data Validator\n');
  
  loadSources();

  // Validate all metric files
  const metricFiles = [
    'metrics/macroeconomics.json',
    'metrics/human_capital.json',
    'metrics/military_spending.json',
  ];

  for (const file of metricFiles) {
    const fullPath = path.join(DATA_DIR, file);
    if (fs.existsSync(fullPath)) {
      validateMetricsFile(fullPath);
    } else {
      log('WARN', fullPath, 'File does not exist yet — skipping');
    }
  }

  // Validate timeline
  const timelinePath = path.join(DATA_DIR, 'events', 'timeline.json');
  if (fs.existsSync(timelinePath)) {
    validateTimeline(timelinePath);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Validation Summary:`);
  console.log(`   ✅ Errors:   ${errors.length}`);
  console.log(`   ⚠️  Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\n❌ FAILED — fix errors before committing data\n');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('\n⚠️  PASSED WITH WARNINGS — review warnings\n');
    process.exit(0);
  } else {
    console.log('\n✅ ALL CHECKS PASSED\n');
    process.exit(0);
  }
}

main();
