<!-- @migration-task Error while migrating Svelte code: 'onsubmit|preventDefault' is not a valid attribute name -->
<!-- src/lib/components/character/equipment/EquipmentList.svelte -->
<script lang="ts">
    import { characterState, addGear, removeGear, addPotion, removePotion, updateCurrency } from '$lib/stores/core/character';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    
    let newGearItem = '';
    let newPotion = '';
    let goldAmount = 0;
    
    function addNewGear() {
        if (newGearItem.trim()) {
            addGear(newGearItem.trim());
            newGearItem = '';
        }
    }
    
    function removeGearItem(itemName: string) {
        removeGear(itemName);
    }
    
    function removePotionItem(itemName: string) {
        removePotion(itemName);
    }
    
    function addNewPotion() {
        if (newPotion.trim()) {
            addPotion(newPotion.trim());
            newPotion = '';
        }
    }
    
    function updateGoldAmount() {
        if (goldAmount !== 0) {
            updateCurrency(goldAmount);
            goldAmount = 0;
        }
    }
</script>

<div class="space-y-4">
    <!-- Currency -->
    <ParchmentCell title="Currency">
        <div class="flex items-center gap-4 mb-4">
            <span class="text-lg">
                {$characterState.equipment.currency.gp} gp
            </span>
            <div class="flex gap-2">
                <input
                    type="number"
                    bind:value={goldAmount}
                    placeholder="Amount"
                    class="w-24 p-2 rounded border border-yellow-200 bg-yellow-50"
                />
                <button
                    onclick={updateGoldAmount}
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
                >
                    Update
                </button>
            </div>
        </div>
    </ParchmentCell>

    <!-- Gear -->
    <ParchmentCell title="Gear">
        <div class="space-y-2 mb-4">
            {#each $characterState.equipment.gear as item}
                <div class="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                    <span>{item}</span>
                    <button
                        class="text-red-500 hover:text-red-700"
                        onclick={() => removeGearItem(item)}
                    >
                        ×
                    </button>
                </div>
            {/each}
        </div>
        <form onsubmit|preventDefault={addNewGear} class="flex gap-2">
            <input
                bind:value={newGearItem}
                placeholder="Add new gear"
                class="flex-1 p-2 rounded border border-yellow-200 bg-yellow-50"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
            >
                Add
            </button>
        </form>
    </ParchmentCell>

    <!-- Potions -->
    <ParchmentCell title="Potions">
        <div class="space-y-2 mb-4">
            {#each $characterState.equipment.potions as potion}
                <div class="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                    <span>{potion}</span>
                    <button
                        class="text-red-500 hover:text-red-700"
                        onclick={() => removePotionItem(potion)}
                    >
                        ×
                    </button>
                </div>
            {/each}
        </div>
        <form onsubmit|preventDefault={addNewPotion} class="flex gap-2">
            <input
                bind:value={newPotion}
                placeholder="Add new potion"
                class="flex-1 p-2 rounded border border-yellow-200 bg-yellow-50"
            />
            <button
                type="submit"
                class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
            >
                Add
            </button>
        </form>
    </ParchmentCell>
</div>
