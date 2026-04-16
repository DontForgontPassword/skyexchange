import { CHART_RANGES } from "@/shared/config"
import { useState } from "react"

export const useChartRange = () => {
    const [range, setRange] = useState<string>(CHART_RANGES[0]);

    return {
        range,
        setRange
    }
}