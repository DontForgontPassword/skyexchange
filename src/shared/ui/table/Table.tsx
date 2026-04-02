import { clsx } from "clsx";
import { ReactNode } from "react";
import "./Table.scss";

export type Column<T> = {
    key: keyof T;
    title: string;
    render?: (value: any, row: T) => ReactNode;
};

interface TableProps<T> {
    columns: Column<T>[];
    rows: T[];
    className?: string;
    maxHeight?: number;
}

export const Table = <T,>({
    columns,
    rows,
    className,
    maxHeight,
}: TableProps<T>) => {
    return (
        <div className={clsx("table", className)}>
            <div className="table__inner">
                <div className="table__head">
                    <div className="table__row table__row--head">
                        {columns.map((column, i) => (
                            <div
                                key={i}
                                className="table__cell table__head-cell"
                            >
                                {column.title}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="table__body"
                    style={{ maxHeight: maxHeight ?? 250 }}
                >
                    {rows.map((row, rowIndex) => (
                        <div className="table__row" key={rowIndex}>
                            {columns.map((column, colIndex) => {
                                const value = row[column.key];

                                return (
                                    <div
                                        key={colIndex}
                                        className="table__cell table__cell--body table__cell--right"
                                    >
                                        {column.render
                                            ? column.render(value, row)
                                            : String(value)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
