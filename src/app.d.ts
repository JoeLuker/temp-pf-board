// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="svelte" />

import type { CoreCharacter } from '$lib/types/character';

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: number;
		}
		interface Locals {
			user: { id: string; name: string };
		}
		interface PageData {
			character: CoreCharacter; // Character data managed by Svelte store
		}
		interface PageState {
			isLoading: boolean;
		}
		interface Platform {
			env: {
				API_URL: string;
			};
		}
	}
}

export {};
