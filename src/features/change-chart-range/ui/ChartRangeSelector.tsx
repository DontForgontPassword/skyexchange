import { CHART_RANGES } from "@/shared/config";
import { Button } from "@/shared/ui/Button";
import "./ChartRangeSelector.scss";

interface Props {
    value: string;
    onChange: (range: string) => void;
}

const ChartRangeSelector = ({ value, onChange }: Props) => {
    return (
        <div className="chart-periods">
            {
                CHART_RANGES.map((range) => (
                    <Button
                        key={range}
                        size={"sm"}
                        variant={
                            value === range
                                ? "default"
                                : "dark"
                        }
                        onClick={() => onChange(range)}
                    >
                        {range}
                    </Button>
                ))
            }
        </div>
    );
}

export { ChartRangeSelector };