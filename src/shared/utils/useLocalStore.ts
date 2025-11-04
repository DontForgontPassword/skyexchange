export function loadLocal<T>(key: string, fallback: T | null = null): T | null {
     try {
          const raw = localStorage.getItem(key);
          if (!raw) return fallback;
          return JSON.parse(raw) as T;
     } catch (err) {
          return fallback;
     }
}

export function saveLocal<T>(key: string, value: T) {
     try {
          localStorage.setItem(key, JSON.stringify(value));
     } catch (err) {
          // ignore
     }
}

export const useLocalStore = { loadLocal, saveLocal };
