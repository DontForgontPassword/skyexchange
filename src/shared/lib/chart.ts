import { RANGE_TO_MS } from '../config/Chart'

/**
 * Сортирует данные графика для выбранного диапазона времени.
 * @param data данные графика
 * @param range часовой диапазон
 * @returns отфильтрованные данные графика
 */
const filterByRange = (data: { time: number; price: number }[], range: string) => {
     const now = Date.now()
     const rangeMs = RANGE_TO_MS[range]
     return data.filter((point) => now - point.time <= rangeMs)
}

/**
 * Сортирует данные по типу.
 * @param array входной массив данных
 * @param type тип сортировки
 * @returns отсортированный массив данных
 */

const sortRows = <T extends { type?: string },>(array: T[], type: string): T[] => {
     if (type === 'all') return array
     return array.filter((item) => item.type === type)
}

export {
     filterByRange,
     sortRows
}