import { FilterOption, FilterType } from "@/shared/model/types/filter";
import { Filter } from "@/shared/ui/Filter";
import { Table } from "@/shared/ui/Table";
import { Card } from "@/shared/ui/Card";
import { clsx } from "clsx";
import { ReactNode, useState } from "react";

type Column<T> = {
    key: keyof T;
    title: string;
    render?: (value: any, row: T) => ReactNode;
};

type TableCardProps<T> = {
    title: string;
    className?: string;
    data: T[];
    columns: Column<T>[];
    filters?: FilterOption[];
};
const TableCard = <T,>({
    title,
    className,
    data,
    columns,
    filters,
}: TableCardProps<T>) => {
    const [filterType, setFilterType] = useState<FilterType>("all");

    return (
        <Card
            className={clsx(className, "table-card")}
            innerClassName="table-card__inner"
        >
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
                rows={data}
                maxHeight={180}
            />
        </Card>
    );
};

export { TableCard };
