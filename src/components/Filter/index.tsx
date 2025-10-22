import { type FC } from "react";
import { filterType } from "@/shared/types";
import "./Filter.scss";
import clsx from "clsx";

type filter = {
     type: filterType;
     label: string;
}

interface FilterProps {
     filters: filter[];
     filterType: filterType;
     setFilterType: React.Dispatch<React.SetStateAction<filterType>>;
     className?: string;
}

const Filter: FC<FilterProps> = ({
     filters, className, filterType, setFilterType
}) => {
     return (
          <div className={clsx("filter", className)}>
               {
                    filters.map((filter) =>
                         <button key={filter.type} className={clsx("filter__button", filterType === filter.type ? "filter__button--active" : "")} onClick={() => setFilterType((prev) => prev === filter.type ? "all" : filter.type)}>{filter.label}</button>)
               }
          </div>
     );
}

export default Filter;