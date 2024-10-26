<!-- src/lib/components/shared/layout/Navigation.svelte -->
<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	// No event handling required
</script>

<div class="min-h-screen flex flex-col">
	<nav class="bg-yellow-900/95 text-yellow-50 p-4 shadow-lg backdrop-blur-sm">
		<div class="container mx-auto flex justify-between items-center">
			<a href="/" class="text-2xl font-pirata hover:text-yellow-200 transition-colors">
				Pathfinder Character Sheet
			</a>
			<div class="space-x-4 font-medium">
				<a
					href="/characters"
					class="hover:text-yellow-200 transition-colors px-3 py-2 rounded-lg hover:bg-yellow-800"
				>
					Characters
				</a>
				<a
					href="/settings"
					class="hover:text-yellow-200 transition-colors px-3 py-2 rounded-lg hover:bg-yellow-800"
				>
					Settings
				</a>
			</div>
		</div>
	</nav>

	<main class="flex-1 container mx-auto px-4 py-8">
		{@render children?.()}
	</main>

	<footer class="bg-yellow-900/95 text-yellow-50 p-4 shadow-lg backdrop-blur-sm mt-auto">
		<div class="container mx-auto text-center">
			<p class="text-sm">
				Built with
				<a
					href="https://kit.svelte.dev"
					class="text-yellow-200 hover:text-yellow-300 transition-colors"
				>
					SvelteKit
				</a>
			</p>
		</div>
	</footer>
</div>
