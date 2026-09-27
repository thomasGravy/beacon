const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatCurrency = (value: number) => currency.format(value);
export const formatCompactCurrency = (value: number) => `$${compact.format(value)}`;
export const formatNumber = (value: number) => value.toLocaleString("en-US");
export const formatDate = (iso: string) => date.format(new Date(iso));
export const formatPercent = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
