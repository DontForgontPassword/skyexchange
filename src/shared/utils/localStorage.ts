/**
 * Получает данные из localStorage.
 * @param key ключ данных
 * @param fallback значение по умолчанию
 * @returns данные из localStorage или значение по умолчанию
 */
function getStorage<T>(key: string, fallback: T | null = null): T | null {
     const data = localStorage.getItem(key)
     if (!data) return fallback
     return JSON.parse(data) as T
}

/**
 * Записывает данные в localStorage.
 * @param key ключ данных
 * @param value значение записи по ключу
 */
function setStorage<T>(key: string, value: T) {
     localStorage.setItem(key, JSON.stringify(value))
}

export {
     getStorage,
     setStorage
}