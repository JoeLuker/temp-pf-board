<script lang="ts">
	import { characterStore, setAbilityScore } from '$lib/stores/core/character.svelte';
	import type { Abilities } from '$lib/types/character';
	import AbilityScore from './AbilityScore.svelte';
	import { getAbilityModifiers } from '$lib/stores/derived/index.svelte';

	const abilityModifiers = $derived(getAbilityModifiers());

	function handleScoreChange(ability: keyof Abilities, score: number) {
		setAbilityScore(ability, score);
	}
</script>

<div class="parchment-cell">
	<h3 class="text-xl font-bold mb-4">Attributes</h3>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		{#each Object.entries(characterStore.baseAttributes) as [ability, score]}
			<AbilityScore
				{ability}
				{score}
				modifier={abilityModifiers[ability as keyof Abilities]}
				onscoreChange={(value) => handleScoreChange(ability as keyof Abilities, value)}
			/>
		{/each}
	</div>
</div>
