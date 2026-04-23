import { TableCard } from "@/shared/ui/TableCard";

import { Column } from "@/shared/ui/Table";
import { clsx } from "clsx";
import { useGetTradesQuery } from "../api/marketApi";
import { Trade } from "../model/types";

const activityColumns: Column<Trade>[] = [
    {
        key: "coinId",
        title: "Coin",
    },
    {
        key: "price",
        title: "Price",
        render: (v, row) => (
            <span
                className={clsx(
                    row.type === "buy" && "table__cell--buy",
                    row.type === "sell" && "table__cell--sell",
                )}
            >
                ${v.toLocaleString("fr-FR")}
            </span>
        ),
    },
    {
        key: "amount",
        title: "Amount",
        render: (v) => v.toFixed(2),
    },
    {
        key: "total",
        title: "Total",
        render: (v) => v.toFixed(2),
    },
];

interface Props {
    className?: string;
}

const TradeActivity = ({ className }: Props) => {
    const { data = [], isLoading } = useGetTradesQuery(undefined, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <TableCard
            title="Trade Activity"
            data={data}
            columns={activityColumns}
        />
    );
};

export { TradeActivity };
