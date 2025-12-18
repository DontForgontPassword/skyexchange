/**
 * Форматирует число как цену с 2 знаками после запятой
 * @param value число
 * @param locale локаль, по умолчанию 'fr-FR'
 * @returns форматированная строка
 */
export const formatPrice = (
    value: number,
    locale: string = 'fr-FR',
): string => {
    return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
