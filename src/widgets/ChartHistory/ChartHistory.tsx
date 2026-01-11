import { ITradeOrder } from "@/entities/Exchange";
import { Column } from "@/shared/types";
import { FilterOption } from "@/shared/types/filter";
import { Filter } from "@/shared/ui/Filter";
import { Table } from "@/shared/ui/Table";
import { sortRows } from "@/shared/utils/chart";
import { useMemo, useState } from "react";
import "./ChartHistory.scss";
import { clsx } from "clsx";

interface IChartHistoryProps {
    title?: string;
    columns: Column[];
    data: ITradeOrder[];
    className?: string;
    filters?: FilterOption[];
}

const ChartHistory = ({
    title,
    columns,
    data,
    filters,
    className,
}: IChartHistoryProps) => {
    const [filterType, setFilterType] = useState<"buy" | "sell" | "all">("all");

    const filteredData = useMemo(
        () => sortRows(data, filterType),
        [data, filterType]
    );

    return (
        <div className={clsx(className, "chart-history")}>
            <h3 className="orders-card__subtitle subtitle">{title}</h3>

            {filters && (
                <Filter
                    strict={false}
                    defaultValue="all"
                    filterType={filterType}
                    setFilterType={setFilterType}
                    className="orders-card__filter"
                    filters={filters}
                />
            )}

            <Table
                className="orders-card__table"
                columns={columns}
                rows={filteredData}
                maxHeight={180}
            />
        </div>
    );
};

export { ChartHistory };
