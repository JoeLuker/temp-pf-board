<!-- @migration-task Error while migrating Svelte code: 'onsubmit|preventDefault' is not a valid attribute name -->
<!-- src/lib/components/character/feats/FeatList.svelte -->
<script lang="ts">
    import { characterState, addFeat, removeFeat } from '$lib/stores/core/character';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';

    let newFeatName = '';

    function handleAddFeat() {
        if (newFeatName.trim()) {
            addFeat(newFeatName);
            newFeatName = '';
        }
    }

    function handleRemoveFeat(feat: string) {
        removeFeat(feat);
    }
</script>

<div class="space-y-4">
    <ParchmentCell title="Feats">
        <!-- Feat List -->
        <div class="space-y-2">
            {#each $characterState.feats as feat}
                <div class="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                    <span class="font-pirata text-lg text-yellow-900">{feat}</span>
                    <button
                        class="text-red-500 hover:text-red-700"
                        onclick={() => handleRemoveFeat(feat)}
                    >
                        ×
                    </button>
                </div>
            {/each}
        </div>
    </ParchmentCell>

    <!-- Add New Feat -->
    <ParchmentCell>
        <form onsubmit|preventDefault={handleAddFeat} class="flex gap-2">
            <input
                type="text"
                bind:value={newFeatName}
                placeholder="Enter new feat name"
                class="flex-1 p-2 rounded border border-yellow-200 bg-yellow-50 focus:outline-none focus:border-yellow-400"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
            >
                Add Feat
            </button>
        </form>
    </ParchmentCell>
</div>
