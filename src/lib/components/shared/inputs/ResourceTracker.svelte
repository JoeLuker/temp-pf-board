<!-- src/lib/components/shared/inputs/ResourceTracker.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Spell } from '$lib/types/spells';
  import { nanoid } from 'nanoid';
  
  interface Props {
    type?: 'bombs' | 'spells' | 'generic';
    spellLevel?: number | undefined;
    total: number;
    used?: number;
    label: string;
    disabled?: boolean;
    recoverable?: boolean;
    spells?: Spell[] | undefined;
  }

  let {
    type = 'generic',
    spellLevel = undefined,
    total,
    used = $bindable(0),
    label,
    disabled = false,
    recoverable = true,
    spells = undefined
  }: Props = $props();
  
  const dispatch = createEventDispatcher<{
      change: { used: number; spellLevel?: number };
      recover: { amount: number; spellLevel?: number };
      cast: { spell: Spell; spellLevel: number };
  }>();
  
  let showSpellList: boolean = $state(false);
  const uniqueId = nanoid();
  let resourceGroupId: string = `resource-group-${uniqueId}`;
  
  function handleChange(index: number, checked: boolean) {
      const newUsed = checked ? index + 1 : index;
      used = newUsed;
      dispatch('change', { used: newUsed, spellLevel });
  }
  
  function handleRecover(amount: number) {
      if (recoverable && used > 0) {
          dispatch('recover', { amount, spellLevel });
      }
  }
  
  function handleSpellCast(spell: Spell) {
      if (!disabled && used < total && spellLevel !== undefined) {
          dispatch('cast', { spell, spellLevel });
          used += 1;
          showSpellList = false;
      }
  }
</script>

<div class="resource-tracker">
  <div class="flex justify-between items-center mb-2">
      <span id={resourceGroupId} class="block text-yellow-900 font-semibold">{label}</span>
      {#if recoverable}
          <button
              type="button"
              class="text-sm text-yellow-600 hover:text-yellow-800"
              onclick={() => handleRecover(1)}
              disabled={disabled || used === 0}
          >
              Recover
          </button>
      {/if}
  </div>

  <div class="flex flex-wrap gap-1" role="group" aria-labelledby={resourceGroupId}>
      {#each Array(total) as _, i}
          <input 
              type="checkbox" 
              id={`resource-${resourceGroupId}-${i}`}
              checked={i < used}
              {disabled}
              onclick={(e) => handleChange(i, e.currentTarget.checked)}
              class="appearance-none w-5 h-5 border-2 border-yellow-600 rounded-full cursor-pointer 
                     checked:bg-yellow-600 transition-colors duration-200 
                     hover:border-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Resource ${i + 1} of ${total}`}
          />
      {/each}
  </div>

  {#if type === 'spells' && spells && spells.length > 0}
      <button
          type="button"
          class="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
          onclick={() => showSpellList = !showSpellList}
          aria-expanded={showSpellList}
      >
          {showSpellList ? 'Hide' : 'Show'} Spells
      </button>

      {#if showSpellList}
          <div class="mt-2 space-y-1" role="listbox">
              {#each spells as spell}
                  <button
                      type="button"
                      class="w-full text-left px-2 py-1 text-sm hover:bg-yellow-100 rounded
                             {used >= total ? 'opacity-50 cursor-not-allowed' : ''}"
                      onclick={() => handleSpellCast(spell)}
                      disabled={used >= total || disabled}
                      role="option"
                      aria-selected="false"
                  >
                      {spell.name}
                  </button>
              {/each}
          </div>
      {/if}
  {/if}
</div>

<style>
  .resource-tracker {
      @apply bg-yellow-50 rounded-lg p-4 border border-yellow-200;
  }
</style>
