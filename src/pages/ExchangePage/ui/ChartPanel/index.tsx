import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react";
import "./ChartPanel.scss";
import {
     BOOK_FILTER_OPTIONS,
     CHART_RANGES,
     ORDER_BOOK_DATA,
     ORDER_COLUMNS,
     TRADE_COLUMNS,
     TRADE_DATA,
} from "@/shared/constants/Chart.constants";
import { FC, useEffect, useState } from "react";
import Table, { Row } from "@/components/Table";
import { formatPrice } from "@/shared/utils/format";
import Filter from "@/components/Filter";
import clsx from "clsx";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ITradingPair, useServerContext } from "@/shared/contexts/ServerContext";
import axios from "axios";
import { toast } from "sonner";
import useCoinCapGraphQL from "./hooks/useCoinCapGraphQL";

interface ChartPanelProps {
     name: string;
     price: number;
     change: number;
}

const ChartPanel: FC<ChartPanelProps> = ({ name, price, change }) => {
     const { server } = useServerContext();
     const [tradeData] = useState<Row[]>(TRADE_DATA);
     const [orderBookData] = useState<Row[]>(ORDER_BOOK_DATA);
     const [filterType, setFilterType] = useState<"buy" | "sell" | "all">("all");
     const [activeRange, setActiveRange] = useState("1H");
     interface ChartPoint {
          time: string;
          price: number;
     }

     const chartData = useCoinCapGraphQL(server, activeRange);

     const onSort = <T extends { type?: string },>(array: T[], type: string): T[] => {
          if (type === "all") return array;
          return array.filter((item) => item.type === type);
     };

     return (
          <div className="chart-panel">
               <div className="chart-panel__wrapper">
                    <div className="chart-panel__card card">
                         <div className="chart-panel__top">
                              {/* header */}
                              <div className="chart-panel__header">
                                   <div className="chart-panel__header-title">
                                        <Bitcoin className="chart-panel__header-icon" />
                                        <h2 className="chart-panel__header-pair">{name}</h2>
                                   </div>

                                   {/* header info */}
                                   <div className="chart-panel__header-info">
                                        <span className="chart-panel__header-price">${formatPrice(server.currentCoin.price)}</span>
                                        <div className={clsx("chart-panel__header-change", change >= 0 ? "chart-panel__header-change--positive" : "chart-panel__header-change--negative")}>
                                             {
                                                  change > 0 ? <TrendingUp width={16} height={16} className="chart-panel__header-change-icon" /> : <TrendingDown width={16} height={16} className="chart-panel__header-change-icon" />
                                             }
                                             <span className="chart-panel__header-change-text">{
                                                  change > 0 ? `+${change}` : `${change}`
                                             }%</span>
                                        </div>
                                   </div>
                              </div>

                              {/* period buttons */}
                              <div className="chart-panel__periods">
                                   {CHART_RANGES.map((range) => (
                                        <button
                                             key={range}
                                             className={clsx("chart-panel__periods-button", range === activeRange ? "chart-panel__periods-button--active" : "")}
                                             onClick={() => setActiveRange(range)}>
                                             {range}
                                        </button>
                                   ))}
                              </div>
                         </div>
                         <div className="chart-container">
                              <ResponsiveContainer width="100%" height="100%">
                                   <LineChart data={chartData}>
                                        <CartesianGrid
                                             strokeDasharray="3 3"
                                             stroke="#21262D"
                                        />
                                        <XAxis
                                             dataKey="time"
                                             stroke="#8B949E"
                                             style={{ fontSize: "12px" }}
                                        />
                                        <YAxis
                                             stroke="#8B949E"
                                             style={{ fontSize: "12px" }}
                                             domain={["auto", "auto"]}
                                        />
                                        <Tooltip
                                             contentStyle={{
                                                  backgroundColor: "#161B22",
                                                  border:
                                                       "1px solid rgba(80, 200, 120, 0.2)",
                                                  borderRadius: "8px",
                                                  color: "#E6EDF3",
                                             }}
                                        />
                                        <Line
                                             type="monotone"
                                             dataKey="price"
                                             stroke="#50C878"
                                             strokeWidth={2}
                                             dot={false}
                                        />
                                   </LineChart>
                              </ResponsiveContainer>
                         </div>
                    </div>

               </div>
               {/* market data */}
               <div className="chart-panel__market-data">
                    <div className="chart-panel__orders card">
                         <h3 className="chart-panel__subtitle subtitle">Order Book</h3>
                         <Filter
                              filterType={filterType}
                              setFilterType={setFilterType}
                              className="chart-panel__filter"
                              filters={BOOK_FILTER_OPTIONS}
                         />
                         <Table
                              className="chart-panel__table"
                              columns={ORDER_COLUMNS}
                              rows={onSort(orderBookData, filterType)}
                         />
                    </div>

                    <div className="chart-panel__trades card">
                         <h3 className="chart-panel__subtitle subtitle">Recent Trades</h3>
                         <Table
                              className="chart-panel__table"
                              columns={TRADE_COLUMNS}
                              rows={tradeData}
                         />
                    </div>
               </div>
          </div>
     );
};

export default ChartPanel;
