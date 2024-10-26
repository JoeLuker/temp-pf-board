<!-- src/lib/components/character/ability-scores/AbilityScore.svelte -->
<script lang="ts">
	import ValueEditor from '$lib/components/shared/inputs/ValueEditor.svelte';
	import ModifierPill from '$lib/components/shared/inputs/ModifierPill.svelte';

	const props = $props<{
		ability: string;
		score: number;
		modifier: number;
		onscoreChange: (newScore: number) => void;
	}>();

	let { ability, score, modifier, onscoreChange } = props;

	function handleScoreChange(value: string | number) {
		if (typeof value === 'number') {
			onscoreChange(value);
		}
	}
</script>

<div class="parchment-cell p-3">
	<div class="flex justify-between items-center">
		<span class="text-lg font-pirata capitalize">{ability}</span>
		<ValueEditor value={score} onvalueChange={handleScoreChange} min={3} max={18} type="number" />
	</div>
	<ModifierPill value={modifier} label="Modifier" />
</div>
