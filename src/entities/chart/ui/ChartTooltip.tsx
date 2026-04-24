import { formatPrice } from "@/shared/lib";

const ChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <p className="chart-tooltip__time">
                    {new Date(payload[0].payload.time).toLocaleString()}
                </p>
                <p className="chart-tooltip__price">
                    Price: <span>${formatPrice(payload[0].value)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export { ChartTooltip }