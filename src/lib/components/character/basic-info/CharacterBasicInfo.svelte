<!-- src/lib/components/character/basic-info/CharacterBasicInfo.svelte -->
<script lang="ts">
  import { characterState } from '$lib/stores/core/character';
</script>

<header class="text-center mb-8">
  <h1 class="text-[#c19a6b] text-4xl">{$characterState.name}</h1>
  <p>Level {$characterState.level} {$characterState.class} | {$characterState.race}</p>
  <p><strong>Player Name:</strong> {$characterState.playerName}</p>
</header>
