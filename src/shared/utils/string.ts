/**
 * Переводит первую букву в верхний регистр.
 * @param string входная строка
 * @returns отформатированная строка
 */
export const firstUpper = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
