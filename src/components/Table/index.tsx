import type { FC, ReactNode } from "react";
import "./Table.scss";

export type Column = {
     name: string;
};

export type Row = {
     id: number;
     price: number;
     amount: number;
     total: number;
     type?: "buy" | "sell";
};
interface TableProps {
     columns: Column[];
     rows: Row[];
     className?: string;
}

const Table: FC<TableProps> = ({ columns, rows, className }) => {
     return (
          <div className={`table ${className ?? ""}`}>
               <div className="table__head">
                    <div className="table__row table__row--head">
                         {columns.map((column, index) => (
                              <div className="table__cell table__head-cell" key={index}>
                                   {column.name}
                              </div>
                         ))}
                    </div>
               </div>

               <div className="table__body">
                    {rows.map((row) => (
                         <div className="table__row" key={row.id}>
                              <div
                                   className={`table__cell table__cell--body table__cell--right ${row.type === "buy"
                                        ? "table__cell--buy"
                                        : row.type === "sell"
                                             ? "table__cell--sell"
                                             : ""
                                        }`}
                              >
                                   ${row.price.toLocaleString("fr-FR")}
                              </div>
                              <div className="table__cell table__cell--body table__cell--right">
                                   {row.amount}
                              </div>
                              <div className="table__cell table__cell--body table__cell--right">
                                   {row.total}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default Table;
