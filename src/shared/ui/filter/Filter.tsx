import { type FC } from "react";
import { FilterType } from "@/shared/types";
import "./Filter.scss";
import clsx from "clsx";
import Button from "../button/Button";

type FilterOption = {
     type: FilterType;
     label: string;
};

interface FilterProps {
     filters: FilterOption[];
     filterType: FilterType;
     setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
     className?: string;
     strict?: boolean;
     defaultValue: FilterType;
}

const Filter: FC<FilterProps> = ({
     filters,
     className,
     filterType,
     setFilterType,
     strict = true,
     defaultValue
}) => {
     const handleClick = (type: FilterType) => {
          if (strict) {
               if (filterType !== type) setFilterType(type);
          } else {
               setFilterType((prev) => (prev === type ? defaultValue : type));
          }
     };

     return (
          <div className={clsx("filter", className)}>
               {filters.map((filter) => (
                    <Button
                         key={filter.type}
                         type="button"
                         className={clsx(
                              "filter__button",
                              filterType === filter.type && "filter__button--active"
                         )}
                         size="md"
                         onClick={() => handleClick(filter.type)}
                    >
                         {filter.label}
                    </Button>
               ))}
          </div>
     );
};

export default Filter;
