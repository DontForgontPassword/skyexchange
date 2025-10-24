import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ChartPoint {
    time: string;
    price: number;
}

const useCoinCapGraphQL = (server: any, activeRange: string) => {
    const [chartData, setChartData] = useState<ChartPoint[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            const coinId = server.currentCoin.type;

            const intervalMap: Record<string, string> = {
                "1H": "m1",
                "24H": "h1",
                "7D": "h6",
                "1M": "d1",
            };
            const interval = intervalMap[activeRange] || "h1";

            const query = `
                query ($id: String!, $interval: String!) {
                    asset(id: $id) {
                        history(interval: $interval) {
                            priceUsd
                            time
                        }
                    }
                }
            `;

            const variables = { id: coinId, interval };

            try {
                const response = await fetch("https://graphql.coincap.io/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                    body: JSON.stringify({ query, variables }),
                });

                const result = await response.json();
                const prices = result.data.asset.history;
                if (!prices || prices.length === 0) return;

                const latestPrice = parseFloat(prices[prices.length - 1].priceUsd);
                const previousPrice = parseFloat(prices[0].priceUsd);

                const priceChange = ((latestPrice - previousPrice) / previousPrice) * 100;

                server.setCurrentCoin({
                    type: coinId,
                    name: `${coinId.toUpperCase()}/USDT`,
                    price: latestPrice,
                    change: priceChange,
                });

                const parsedPrices: ChartPoint[] = prices.map((p: any) => ({
                    time:
                        activeRange === "1H" || activeRange === "24H"
                            ? new Date(p.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                            : new Date(p.time).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    price: parseFloat(parseFloat(p.priceUsd).toFixed(2)),
                }));

                setChartData(parsedPrices);
            } catch (error) {
                toast.error("Failed to fetch coin data");
                console.error(error);
            }
        };

        fetchChartData();
        const intervalId = setInterval(fetchChartData, 10000);
        return () => clearInterval(intervalId);
    }, [activeRange, server]);

    return chartData;
};

export default useCoinCapGraphQL;
