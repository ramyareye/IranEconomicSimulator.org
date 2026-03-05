
const data = require('./data.json');

class IranEconomicTicker {
    constructor(config) {
        this.items = config.drain_items;
        this.usdRate = config.settings.usd_rate;
        this.startTime = new Date(config.settings.fiscal_year_start).getTime();
    }

    calculateLive() {
        const now = Date.now();
        const secondsElapsed = (now - this.startTime) / 1000;

        return this.items.map(item => {
            const perSecondIrr = item.annual_budget_irr / (365 * 24 * 60 * 60);
            const totalIrr = perSecondIrr * secondsElapsed;
            
            // Adding Multiplier Effect (Economic loss is often 3x the direct stolen amount)
            const economicImpactUsd = (totalIrr / this.usdRate) * (item.multiplier || 1);

            return {
                id: item.id,
                label: item.label,
                total_irr: Math.floor(totalIrr),
                total_usd: totalIrr / this.usdRate,
                economic_impact_usd: economicImpactUsd,
                equivalent_metric: this.getEquivalent(totalIrr)
            };
        });
    }

    getEquivalent(amountIrr) {
        const breadPrice = 5000; // 5000 IRR for a simple bread
        return Math.floor(amountIrr / breadPrice).toLocaleString() + " loaves of bread";
    }
}

const ticker = new IranEconomicTicker(data);
console.log("Ticker Engine Initialized...");
// For production, this would feed an API endpoint
