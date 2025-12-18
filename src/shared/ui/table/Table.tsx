import type { FC } from 'react'
import './Table.scss'
import clsx from 'clsx'
import { ITradeOrder } from '@/shared/store/useExchangeStore'

export type Column = {
     name: string;
};


interface TableProps {
     columns: Column[];
     rows: ITradeOrder[];
     className?: string;
     maxHeight?: number;
}

export const Table: FC<TableProps> = ({ columns, rows, className, maxHeight }) => {
     return (
          <div className={clsx('table', className)}>
               <div className="table__inner">
                    <div className="table__head">
                         <div className="table__row table__row--head">
                              {columns.map((column, index) => (
                                   <div className="table__cell table__head-cell" key={index}>
                                        {column.name}
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="table__body" style={{ maxHeight: maxHeight ?? 250 }}>
                         {rows.map((row, index) => (
                              <div className="table__row" key={`${index}-${row.amount}-${row.type}`}>
                                   <div
                                        className={
                                             clsx('table__cell',
                                                  'table__cell--body',
                                                  'table__cell--right',

                                             )}
                                   >
                                        {row.coin}
                                   </div>
                                   <div
                                        className={clsx('table__cell table__cell--body', 'table__cell--right', row.type === 'buy' ? 'table__cell--buy' : row.type === 'sell' ? 'table__cell--sell' : '')}
                                   >
                                        ${row.price.toLocaleString('fr-FR')}
                                   </div>
                                   <div className="table__cell table__cell--body table__cell--right">
                                        {row.amount.toFixed(2)}
                                   </div>
                                   <div className="table__cell table__cell--body table__cell--right">
                                        {row.total.toFixed(2)}
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div >
     )
}