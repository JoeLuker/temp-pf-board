<script lang="ts">
	import { characterStore } from '$lib/stores/core/character.svelte';
	import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
</script>

<header class="text-center mb-4 sm:mb-8">
	<ParchmentCell title="Character Information">
		<h1 class="text-[#c19a6b] text-2xl sm:text-4xl">{characterStore.name}</h1>
		<p class="text-sm sm:text-base">
			Level {characterStore.level} {characterStore.class} | {characterStore.race}
		</p>
		<p class="text-sm sm:text-base"><strong>Player Name:</strong> {characterStore.playerName}</p>
	</ParchmentCell>
</header>
