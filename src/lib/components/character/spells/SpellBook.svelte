<script lang="ts">
    import { characterStore, addSpell, removeSpell } from '$lib/stores/core/character.svelte';
    import { alchemistSpells } from '$lib/data/rules/spells';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import type { SpellInfo } from '$lib/types/character';
    import type { Spell } from '$lib/types/spells';
    
    // Explicit type annotations for runes
    let selectedSpellLevel = $state<number>(1);
    let selectedSpellName = $state<string>('');
    let spellsByLevel = $state<Record<number, SpellInfo[]>>({});
    let availableSpells = $state<Spell[]>([]);
    
    function addNewSpell() {
        if (selectedSpellName) {
            addSpell({
                level: selectedSpellLevel,
                name: selectedSpellName
            });
            selectedSpellName = '';
        }
    }
    
    function handleOnAddSpell(event: Event) {
        event.preventDefault();
        addNewSpell();
    }
    
    $effect(() => {
        const acc: Record<number, SpellInfo[]> = {};
        characterStore.spellsKnown.forEach(spell => {
            if (!acc[spell.level]) acc[spell.level] = [];
            acc[spell.level].push(spell);
        });
        spellsByLevel = acc;
    });
    
    $effect(() => {
        availableSpells = alchemistSpells.filter(spell => 
            spell.level === selectedSpellLevel && 
            !characterStore.spellsKnown.some(known => known.name === spell.name)
        );
    });
</script>

<div class="space-y-4">
    <!-- Spell Levels -->
    {#each Object.entries(spellsByLevel) as [level, spells]}
        <ParchmentCell title={`Level ${level} Spells`}>
            <div class="space-y-2">
                {#each spells as spell}
                    <div class="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                        <span class="font-pirata text-lg text-yellow-900 truncate">{spell.name}</span>
                        <button
                            class="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
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
            onsubmit={handleOnAddSpell}
            class="space-y-4"
        >
            <div class="flex flex-wrap gap-2">
                <select
                    bind:value={selectedSpellLevel}
                    class="p-2 rounded border border-yellow-200 bg-yellow-50 w-32"
                >
                    {#each Array.from({ length: 6 }) as _, i}
                        <option value={i + 1}>Level {i + 1}</option>
                    {/each}
                </select>

                <select
                    bind:value={selectedSpellName}
                    class="flex-1 min-w-[200px] p-2 rounded border border-yellow-200 bg-yellow-50"
                >
                    <option value="">Select a spell</option>
                    {#each availableSpells as spell}
                        <option value={spell.name}>{spell.name}</option>
                    {/each}
                </select>

                <button
                    type="submit"
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors flex-shrink-0"
                    disabled={!selectedSpellName}
                >
                    Add Spell
                </button>
            </div>
        </form>
    </ParchmentCell>
</div>
