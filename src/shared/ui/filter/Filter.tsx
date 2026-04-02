import { type FC } from "react";
import { FilterOption, FilterType } from "@/shared/types/filter";
import { Button } from "../Button";
import "./Filter.scss";
import { clsx } from "clsx";

interface IFilterProps {
    filters: FilterOption[];
    filterType: FilterType;
    setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
    className?: string;
    strict?: boolean;
    defaultValue: FilterType;
}

export const Filter: FC<IFilterProps> = ({
    filters,
    className,
    filterType,
    setFilterType,
    strict = true,
    defaultValue,
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
                    variant="transparent"
                    className={clsx(
                        "filter__button",
                        filterType === filter.type && "filter__button--active",
                    )}
                    onClick={() => handleClick(filter.type)}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
};
