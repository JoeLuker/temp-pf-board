// src/lib/stores/persistence/index.svelte.ts

/**
 * Creates a persistent state store using Svelte's state management.
 *
 * @param key - The key under which to store the data in localStorage
 * @param initial - The initial state value
 * @returns The persisted state
 */
export function persistStore<T>(key: string, initial: T): T {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
		return initial;
	}

	// Try to load from localStorage
	try {
		const stored = localStorage.getItem(key);
		if (stored) {
			return JSON.parse(stored) as T;
		}
	} catch (e) {
		console.warn(`Failed to load state for key "${key}"`, e);
	}

	return initial;
}

/**
 * Saves state to localStorage
 */
export function saveState<T>(key: string, state: T): void {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
		return;
	}

	try {
		localStorage.setItem(key, JSON.stringify(state));
	} catch (e) {
		console.warn(`Failed to save state for key "${key}"`, e);
	}
}
