/**
 * Делает первую букву заглавной
 * @param string 
 * @returns 
 */
export const firstUpper = (string : string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
