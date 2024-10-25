<!-- @migration-task Error while migrating Svelte code: 'onsubmit|preventDefault' is not a valid attribute name -->
<!-- src/lib/components/character/spells/SpellBook.svelte -->
<script lang="ts">
    import { characterState, addSpell, removeSpell } from '$lib/stores/core/character';
    import { alchemistSpells } from '$lib/data/rules/spells';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import type { SpellInfo } from '$lib/types/character';
    import { derived } from 'svelte';
    
    let selectedSpellLevel = 1;
    let selectedSpellName = '';
    
    function addNewSpell() {
        if (selectedSpellName) {
            addSpell({
                level: selectedSpellLevel,
                name: selectedSpellName
            });
            selectedSpellName = '';
        }
    }
    
    const spellsByLevel = derived(characterState, $char => {
        const acc: Record<number, SpellInfo[]> = {};
        $char.spellsKnown.forEach(spell => {
            if (!acc[spell.level]) acc[spell.level] = [];
            acc[spell.level].push(spell);
        });
        return acc;
    });
    
    const availableSpells = derived([characterState, () => selectedSpellLevel], ([$char, $level]) => 
        alchemistSpells.filter(spell => 
            spell.level === $level && 
            !$char.spellsKnown.some(known => known.name === spell.name)
        )
    );
</script>

<div class="space-y-4">
    <!-- Spell Levels -->
    {#each Object.entries($spellsByLevel) as [level, spells]}
        <ParchmentCell title={`Level ${level} Spells`}>
            <div class="space-y-2">
                {#each spells as spell}
                    <div class="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                        <span class="font-pirata text-lg text-yellow-900">{spell.name}</span>
                        <button
                            class="text-red-500 hover:text-red-700"
                            onclick={() => removeSpell(spell.name)}
                        >
                            ×
                        </button>
                    </div>
                {/each}
            </div>
        </ParchmentCell>
    {/each}

    <!-- Add New Spell -->
    <ParchmentCell>
        <form
            onsubmit|preventDefault={addNewSpell}
            class="space-y-4"
        >
            <div class="flex gap-4">
                <select
                    bind:value={selectedSpellLevel}
                    class="p-2 rounded border border-yellow-200 bg-yellow-50"
                >
                    {#each Array(6) as _, i}
                        <option value={i + 1}>Level {i + 1}</option>
                    {/each}
                </select>

                <select
                    bind:value={selectedSpellName}
                    class="flex-1 p-2 rounded border border-yellow-200 bg-yellow-50"
                >
                    <option value="">Select a spell</option>
                    {#each $availableSpells as spell}
                        <option value={spell.name}>{spell.name}</option>
                    {/each}
                </select>

                <button
                    type="submit"
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
                    disabled={!selectedSpellName}
                >
                    Add Spell
                </button>
            </div>
        </form>
    </ParchmentCell>
</div>
