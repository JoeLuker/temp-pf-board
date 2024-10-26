<!-- src/lib/components/shared/inputs/ResourceTracker.svelte -->
<script lang="ts">
	const props = $props<{
		label: string;
		type?: 'bombs' | 'spells' | 'generic';
		total: number;
		used: number;
		onuse: (event: { used: number }) => void;
	}>();

	let { label, type = 'generic', total, used = 0, onuse } = props;
</script>

<div class="resource-tracker">
	<h3 class="text-lg font-pirata mb-2">{label}</h3>
	<div class="flex gap-2">
		{#each Array(total) as _, i}
			<input
				type="checkbox"
				checked={i < used}
				onclick={() => onuse({ used: i + 1 })}
				class="w-6 h-6 rounded-full border-2 border-yellow-600 checked:bg-yellow-600 transition-colors duration-200"
			/>
		{/each}
	</div>
</div>
