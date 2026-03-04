# Technical Architecture: Transparency-First Design
## 1. No-Database Architecture (GitDB)
To ensure maximum integrity and prevent "gaslighting," the primary database is a public GitHub repository.
- **Auditability:** Every change to a data point is logged via Git Commits.
- **Decentralization:** Anyone can fork the data.

## 2. The Engine (Node.js/TypeScript)
- **Stateful Counters:** Logic to calculate "Accumulated Cost" based on the formula:
  `Current_Total = Base_Value + (Rate_Per_Second * Seconds_Since_Base_Date)`
- **API Layer:** Simple REST/GraphQL to feed the Mobile and Web frontends.

## 3. Frontend (React Native + Next.js)
- **Shared Logic:** The calculation engine lives in a shared package.
- **Visuals:** High-performance ticker components using `Reanimated` and `D3.js`.
