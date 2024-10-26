<script lang="ts">
	import { characterStore } from '$lib/stores/core/character.svelte';
</script>

<header class="text-center mb-8">
	<h1 class="text-[#c19a6b] text-4xl">{characterStore.name}</h1>
	<p>Level {characterStore.level} {characterStore.class} | {characterStore.race}</p>
	<p><strong>Player Name:</strong> {characterStore.playerName}</p>
</header>
