<!-- src/routes/characters/+page.svelte -->
<script lang="ts">
    import { run } from 'svelte/legacy';

    import { charactersStore } from '$lib/stores/core/characters';
    import { goto } from '$app/navigation';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import type { CharacterSummary } from '$lib/types/character';

    let characters: CharacterSummary[] = $state([]);
    let deleteConfirmation: string | null = $state(null);

    run(() => {
        characters = $charactersStore;
    });

    function handleDelete(id: string) {
        if (deleteConfirmation !== id) {
            deleteConfirmation = id;
            return;
        }

        charactersStore.update(chars => chars.filter(char => char.id !== id));
        deleteConfirmation = null;
    }

    function handleEdit(id: string) {
        goto(`/characters/${id}`);
    }

    function cancelDelete() {
        deleteConfirmation = null;
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-pirata text-yellow-900 mb-4">Characters</h1>
    <div class="space-y-4">
        {#each $charactersStore as character}
            <ParchmentCell title={character.name}>
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="font-pirata text-xl text-yellow-900">{character.name}</h2>
                        <p>Level {character.level} {character.class} | {character.race}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button
                            onclick={() => handleEdit(character.id)}
                            class="px-3 py-1 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onclick={() => handleDelete(character.id)}
                            class="px-3 py-1 bg-red-500 text-red-50 rounded hover:bg-red-600 transition-colors"
                        >
                            {deleteConfirmation === character.id ? 'Confirm' : 'Delete'}
                        </button>
                        {#if deleteConfirmation === character.id}
                            <button
                                onclick={cancelDelete}
                                class="px-3 py-1 bg-gray-500 text-gray-50 rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        {/if}
                    </div>
                </div>
            </ParchmentCell>
        {/each}
    </div>
</div>
