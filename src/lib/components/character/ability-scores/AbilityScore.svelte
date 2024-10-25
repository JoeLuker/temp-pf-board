<!-- src/lib/components/character/ability-scores/AbilityScore.svelte -->
<script lang="ts">
    import type { AbilityScoreProps } from '../types';  // Ensure correct path
    import ValueEditor from '../../shared/inputs/ValueEditor.svelte';
    import ModifierPill from '../../shared/inputs/ModifierPill.svelte';
    
    interface Props {
        ability: string;
        score: number;
        modifier: number;
        onScoreChange: (newScore: number) => void;
    }

    let {
        ability,
        score,
        modifier,
        onScoreChange
    }: Props = $props();
</script>

<div class="parchment-cell p-3">
    <div class="flex justify-between items-center">
        <span class="text-lg font-pirata capitalize">{ability}</span>
        <ValueEditor
            value={score}
            onChange={(value) => onScoreChange(value as number)}
            min={3}
            type="number"
        />
    </div>
    <ModifierPill value={modifier} label="Modifier" />
</div>
