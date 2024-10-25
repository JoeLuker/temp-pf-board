<!-- src/lib/components/character/ability-scores/AbilityScores.svelte -->
<script lang="ts">
  import { characterState } from '$lib/stores/core/character';
  import { abilityModifiersDerived } from '$lib/stores/derived';
  import type { Abilities } from '$lib/types/character';
  import AbilityScore from './AbilityScore.svelte';
</script>

<div class="parchment-cell">
  <h3 class="text-xl font-bold mb-4">Attributes</h3>
  {#each Object.entries($characterState.baseAttributes) as [ability, score]}
      <AbilityScore 
          ability={ability} 
          score={score} 
          modifier={$abilityModifiersDerived[ability as keyof Abilities]}
          onScoreChange={(newScore: number) => {
              setAbilityScore(ability as keyof Abilities, newScore);
          }}
      />
  {/each}
</div>
