const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchTopCoins({
  currency = "usd",
  perPage = 50,
  signal,
} = {}) {
  const params = new URLSearchParams({
    vs_currency: currency,
    order: "market_cap_desc",
    per_page: String(perPage),
    page: "1",
    sparkline: "false",
  });

  const response = await fetch(`${BASE_URL}/coins/markets?${params}`, {
    signal,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Слишком много запросов. Подожди минуту и попробуй снова.");
    }
    throw new Error(`Ошибка API: ${response.status}`);
  }

  return response.json();
}