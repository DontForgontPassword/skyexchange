import { useQuery } from "@tanstack/react-query";
import { TableCard } from "@/shared/ui/TableCard";

import { Column } from "@/shared/ui/Table/Table";
import { ITrade } from "../api/types";
import { getTrades } from "../api/get-trades";
import clsx from "clsx";

const activityColumns: Column<ITrade>[] = [
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

interface ITradeActivityProps {
    className?: string;
}

const TradeActivity = ({ className }: ITradeActivityProps) => {
    const { data = [], isLoading } = useQuery({
        queryKey: ["trades"],
        queryFn: getTrades,
    });

    if (isLoading) {
        return <div>Loading...</div>;
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
