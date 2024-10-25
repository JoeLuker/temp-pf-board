// src/lib/stores/persistence/index.ts
import { state } from 'svelte';
import { browser } from '$app/environment';

export function persistStore<T>(key: string, initial: T) {
    const stored = browser ? localStorage.getItem(key) : null;
    const data = stored ? JSON.parse(stored) : initial;
    
    const currentState = state(data);
    
    if (browser) {
        currentState.subscribe(current => {
            localStorage.setItem(key, JSON.stringify(current));
        });
    }
    
    return currentState;
}
