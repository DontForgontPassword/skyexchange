import clsx from 'clsx'
import { type FC } from 'react'
import { FilterType } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import './Filter.scss'

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

export const Filter: FC<FilterProps> = ({
    filters,
    className,
    filterType,
    setFilterType,
    strict = true,
    defaultValue,
}) => {
    const handleClick = (type: FilterType) => {
        if (strict) {
            if (filterType !== type) setFilterType(type)
        } else {
            setFilterType((prev) => (prev === type ? defaultValue : type))
        }
    }

    return (
        <div className={clsx('filter', className)}>
            {filters.map((filter) => (
                <Button
                    key={filter.type}
                    type="button"
                    className={clsx(
                        'filter__button',
                        filterType === filter.type && 'filter__button--active',
                    )}
                    onClick={() => handleClick(filter.type)}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    )
}
