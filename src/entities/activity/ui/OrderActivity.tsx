import { useQuery } from "@tanstack/react-query";
import { TableCard } from "@/shared/ui/TableCard";
import { Column } from "@/shared/ui/Table/Table";
import { IOrder } from "../api/types";
import clsx from "clsx";
import { getOrders } from "../api/get-orders";

const activityColumns: Column<IOrder>[] = [
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

interface IOrderActivityProps {
    className?: string;
}

const OrderActivity = ({ className }: IOrderActivityProps) => {
    const { data = [], isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <TableCard title="Order Book" data={data} columns={activityColumns} />
    );
};

export { OrderActivity };
