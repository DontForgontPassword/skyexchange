import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react";
import "./ChartPanel.scss";
import {
     BOOK_FILTER_OPTIONS,
     CHART_RANGES,
     ORDER_COLUMNS,
     TRADE_COLUMNS,
} from "@/shared/constants/Chart.constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/shared/utils/format";
import clsx from "clsx";
import { useExchangeStore } from "@/shared/store/useExchangeStore";
import {
     ResponsiveContainer,
     LineChart,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
} from "recharts";
import { getStorage, setStorage } from "@/shared/utils/localStorage";
import { filterByRange, sortRows } from "@/shared/utils/chart";
import Filter from "@/shared/ui/filter/Filter";
import Table from "@/shared/ui/table/Table";

const zoneTime = new Intl.DateTimeFormat("ru-RU", {
     hour: "2-digit",
     minute: "2-digit",
     hour12: false,
     timeZone: "Europe/Warsaw"
})

const ChartPanel = () => {
     const [filterType, setFilterType] = useState<"buy" | "sell" | "all">("all");
     const [activeRange, setActiveRange] = useState("1H");

     const trades = useExchangeStore(s => s.trades);
     const orders = useExchangeStore(s => s.orders);
     const currentCoin = useExchangeStore(s => s.currentCoin);

     const {
          price,
          name,
          change
     } = currentCoin;

     const isPositive = change >= 0;

     const [chartData, setChartData] = useState<{ time: number; price: number }[]>(() => {
          const saved = getStorage("chartData");
          return Array.isArray(saved) ? saved : [];
     });

     const lastUpdateTime = useRef(Date.now());

     useEffect(() => {
          const now = Date.now();

          if (now - lastUpdateTime.current >= 500) {
               setChartData((prev) => {
                    const nextData = [
                         ...prev,
                         {
                              time: now, price
                         }
                    ];

                    const limitedData = nextData.slice(-100);

                    setStorage("chartData", limitedData);

                    return limitedData;
               });

               lastUpdateTime.current = now;
          }
     }, [price]);

     const formattedData = useMemo(() => {
          const filtered = filterByRange(chartData, activeRange);
          return filtered.map((p) => ({
               ...p,
               label: zoneTime.format(p.time),
          }));
     }, [chartData, activeRange]);

     return (
          <div className="chart-panel">
               <div className="chart-panel__wrapper">
                    <div className="chart-panel__card card">
                         <div className="chart-panel__top">
                              <div className="chart-panel__header">
                                   <div className="chart-panel__header-title">
                                        <img src={currentCoin.icon} className="chart-panel__header-icon" />
                                        <h2 className="chart-panel__header-pair">{name}</h2>
                                   </div>

                                   <div className="chart-panel__header-info">
                                        <span className="chart-panel__header-price">${formatPrice(price)}</span>
                                        <div
                                             className={clsx(
                                                  "chart-panel__header-change",
                                                  isPositive
                                                       ? "chart-panel__header-change--positive"
                                                       : "chart-panel__header-change--negative"
                                             )}
                                        >
                                             {isPositive ? (
                                                  <TrendingUp
                                                       width={16}
                                                       height={16}
                                                       className="chart-panel__header-change-icon"
                                                  />
                                             ) : (
                                                  <TrendingDown
                                                       width={16}
                                                       height={16}
                                                       className="chart-panel__header-change-icon"
                                                  />
                                             )}
                                             <span className="chart-panel__header-change-text">
                                                  {isPositive ? `+${change}` : `${change}`}%
                                             </span>
                                        </div>
                                   </div>
                              </div>

                              <div className="chart-panel__periods">
                                   {CHART_RANGES.map((range) => (
                                        <button
                                             key={range}
                                             className={clsx(
                                                  "chart-panel__periods-button",
                                                  range === activeRange ? "chart-panel__periods-button--active" : "")}
                                             onClick={() => setActiveRange(range)}>
                                             {range}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="chart-panel__chart-container">
                              <ResponsiveContainer width="100%" height={300}>
                                   <LineChart data={formattedData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#21262D" />
                                        <XAxis
                                             dataKey="label"
                                             stroke="#8B949E"
                                             style={{ fontSize: "12px" }}
                                             tickCount={6}
                                        />
                                        <YAxis
                                             stroke="#8B949E"
                                             style={{ fontSize: "12px" }}
                                             domain={["auto", "auto"]}
                                             tickCount={6}
                                        />
                                        <Tooltip
                                             contentStyle={{
                                                  backgroundColor: "#161B22",
                                                  border: "1px solid rgba(80, 200, 120, 0.2)",
                                                  borderRadius: "8px",
                                                  color: "#E6EDF3",
                                             }}
                                             formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
                                        />
                                        <Line
                                             type="monotone"
                                             dataKey="price"
                                             stroke="#50C878"
                                             strokeWidth={2}
                                             dot={false}
                                             isAnimationActive={true}
                                             animationDuration={600}
                                        />
                                   </LineChart>
                              </ResponsiveContainer>
                         </div>
                    </div>
               </div>

               <div className="chart-panel__market-data">
                    <div className="chart-panel__orders card">
                         <h3 className="chart-panel__subtitle subtitle">Order Book</h3>
                         <Filter
                              strict={false}
                              defaultValue={"all"}
                              filterType={filterType}
                              setFilterType={setFilterType}
                              className="chart-panel__filter"
                              filters={BOOK_FILTER_OPTIONS}
                         />
                         <Table
                              className="chart-panel__table"
                              columns={ORDER_COLUMNS}
                              rows={sortRows(orders, filterType)}
                              maxHeight={180}
                         />
                    </div>

                    <div className="chart-panel__trades card">
                         <h3 className="chart-panel__subtitle subtitle">Recent Trades</h3>
                         <Table
                              className="chart-panel__table"
                              columns={TRADE_COLUMNS}
                              rows={trades}
                              maxHeight={240}
                         />
                    </div>
               </div>
          </div>
     );
};

export default ChartPanel;
