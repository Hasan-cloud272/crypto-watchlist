export function formatPrice(value, currency = "usd") {
  if (value == null) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

export function formatPercent(value) {
  if (value == null) return "—";

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatMarketCap(value, currency = "usd") {
  if (value == null) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}