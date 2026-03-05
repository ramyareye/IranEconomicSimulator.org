# Project "Azadi Cost & Potential" (ACP) - Internal Blueprint
## Vision
A data-driven, transparent, and real-time visualization of the economic cost of the current regime in Iran and the "Opportunity Cost" of a free, democratic, and normal Iran.

---

## 1. Technical Architecture (Senior Engineer Perspective)

### Data Strategy: "JSON-as-a-Source"
To maximize trust (especially for Hacker News), we will use a **Public-First Data Policy**.
- **GitHub Repository (`/data` folder):** All raw data, sources, and formulas will live in JSON files.
- **Transparency:** Anyone can verify the math or submit a Pull Request to correct a number.
- **Sync Mechanism:** The Node.js backend will fetch/cache these JSONs. For real-time tickers, we use "Growth Rates" calculated from the annual/monthly delta.

### Tech Stack
- **Backend:** Node.js (Fastify/Express) - Simple API to serve the calculated "Live" numbers.
- **Frontend (Web):** React + Tailwind CSS (Focus on high-impact typography and dark mode).
- **Mobile:** React Native (sharing the logic layer with the web).
- **State Management:** Simple `setInterval` logic on the client-side for the "Ticker" effect, synced with Server Time.

---

## 2. Data Taxonomy (The "What")

### Category A: Direct Costs (The Drain)
1. **Ideological Budget:** Budgets for 20+ religious and propaganda institutions (Source: Annual Budget Law).
2. **Regional Interference:** Estimated spending in Syria, Lebanon, Yemen, Iraq.
3. **Corruption & Embezzlement:** A tracked list of major cases (Total sum).
4. **Oil Discounts:** The "Sanction Tax" – the difference between Brent price and what China actually pays Iran.

### Category B: Hidden Costs (The Decay)
1. **Brain Drain:** Value of human capital leaving per year (Calculated by education cost per person).
2. **Environmental Cost:** Cost of restoring dried lakes/wetlands vs. current mismanagement.
3. **Currency Devaluation:** Real-time loss of purchasing power against a basket of goods.

### Category C: The "Normal Iran" Potential (The Future)
1. **FDI (Foreign Direct Investment):** Potential vs. Current (Benchmark: Turkey/Vietnam).
2. **Tourism Revenue:** Potential based on UNESCO sites (Benchmark: Egypt/Turkey).
3. **Tech Sector Growth:** Potential of the young workforce without internet censorship.

---

## 3. Implementation Plan (Step-by-Step)

### Step 1: Data Scrapping & Validation (Week 1-2)
- Extract "Religious Budget" from the 1403/1404 Budget Law.
- Compile the "Embezzlement List" with dates and USD conversions.
- Define the "Growth Per Second" formula for each metric.

### Step 2: Core Logic (Backend)
- Build the `calcEngine.js`.
- Inputs: `BaseValue`, `AnnualGrowthRate`, `StartDate`.
- Output: `CurrentValueAt(Timestamp)`.

### Step 3: Design System (The "Impact" UI)
- **Primary Color:** "Emergency Red" for the Drain, "Growth Green" for the Future.
- **Ticker Component:** Smooth number rolling using `Reanimated`.

### Step 4: Social Proof & Launch
- Create "Shareable Cards" (Social Media images) generated from the live data.
- Pitch to Hacker News with the "Open Data" and "GitHub-as-Source" angle.

---

## 4. Methodology & Sources
All data points MUST have a `source_url` and a `confidence_score` (1-5).
- Official Budget: 5/5
- NGO Estimates: 3/5
- News Reports: 2/5
