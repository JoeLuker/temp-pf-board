<script lang="ts">
    import { character } from '$lib/stores/core/character';
    import { goto } from '$app/navigation';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import type { Character, Abilities } from '$lib/types/character';
    
    let currentStep = $state(1);
    let totalSteps = 5;
    let characterData: Partial<Character> = $state({
        baseAttributes: {
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10
        }
    });
    let errors: Record<string, string> = $state({});

    const abilities: Array<keyof Abilities> = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    function updateAbilityScore(ability: keyof Abilities, value: number) {
        if (characterData.baseAttributes) {
            characterData.baseAttributes[ability] = value;
        }
    }

    const validateStep = (step: number): boolean => {
        errors = {};
        switch (step) {
            case 1: // Basic Info
                if (!characterData.name?.trim()) errors.name = 'Name is required';
                if (!characterData.playerName?.trim()) errors.playerName = 'Player name is required';
                if (!characterData.race?.trim()) errors.race = 'Race is required';
                if (!characterData.class?.trim()) errors.class = 'Class is required';
                break;
            case 2: // Abilities
                if (!characterData.baseAttributes) errors.attributes = 'Abilities must be set';
                break;
            // Add validation for other steps
        }
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            currentStep++;
        }
    };

    const handlePrevious = () => {
        currentStep--;
    };

    const handleSubmit = async () => {
        if (validateStep(currentStep)) {
            try {
                character.set(characterData as Character);
                await goto('/characters');
            } catch (error) {
                console.error('Error creating character:', error);
            }
        }
    };
</script>

<div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-pirata text-yellow-900 mb-8">Create New Character</h1>

    <!-- Progress Bar -->
    <div class="mb-8">
        <div class="h-2 bg-yellow-200 rounded-full">
            <div 
                class="h-2 bg-yellow-600 rounded-full transition-all duration-300"
                style="width: {(currentStep / totalSteps) * 100}%"
></div>
        </div>
        <div class="text-sm text-yellow-600 mt-2">Step {currentStep} of {totalSteps}</div>
    </div>

    <!-- Step Content -->
    <ParchmentCell>
        {#if currentStep === 1}
            <div class="space-y-4">
                <h2 class="text-xl font-pirata">Basic Information</h2>
                
                <div class="space-y-2">
                    <label class="block">
                        <span class="text-yellow-900">Character Name</span>
                        <input
                            type="text"
                            bind:value={characterData.name}
                            class="mt-1 block w-full rounded border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                        />
                        {#if errors.name}
                            <span class="text-red-500 text-sm">{errors.name}</span>
                        {/if}
                    </label>

                    <label class="block">
                        <span class="text-yellow-900">Player Name</span>
                        <input
                            type="text"
                            bind:value={characterData.playerName}
                            class="mt-1 block w-full rounded border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                        />
                        {#if errors.playerName}
                            <span class="text-red-500 text-sm">{errors.playerName}</span>
                        {/if}
                    </label>

                    <label class="block">
                        <span class="text-yellow-900">Race</span>
                        <select
                            bind:value={characterData.race}
                            class="mt-1 block w-full rounded border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                        >
                            <option value="">Select a race</option>
                            <option value="Human">Human</option>
                            <option value="Elf">Elf</option>
                            <option value="Dwarf">Dwarf</option>
                            <option value="Halfling">Halfling</option>
                            <option value="Gnome">Gnome</option>
                        </select>
                        {#if errors.race}
                            <span class="text-red-500 text-sm">{errors.race}</span>
                        {/if}
                    </label>

                    <label class="block">
                        <span class="text-yellow-900">Class</span>
                        <select
                            bind:value={characterData.class}
                            class="mt-1 block w-full rounded border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                        >
                            <option value="">Select a class</option>
                            <option value="Alchemist">Alchemist</option>
                            <option value="Fighter">Fighter</option>
                            <option value="Wizard">Wizard</option>
                            <option value="Cleric">Cleric</option>
                            <option value="Rogue">Rogue</option>
                        </select>
                        {#if errors.class}
                            <span class="text-red-500 text-sm">{errors.class}</span>
                        {/if}
                    </label>
                </div>
            </div>

        {:else if currentStep === 2}
            <div class="space-y-4">
                <h2 class="text-xl font-pirata">Ability Scores</h2>
                <div class="grid grid-cols-2 gap-4">
                    {#each abilities as ability}
                        <label class="block">
                            <span class="text-yellow-900 capitalize">{ability}</span>
                            <input
                                type="number"
                                value={characterData.baseAttributes?.[ability] ?? 10}
                                oninput={(e) => updateAbilityScore(ability, +e.currentTarget.value)}
                                min="3"
                                max="18"
                                class="mt-1 block w-full rounded border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                            />
                        </label>
                    {/each}
                </div>
                {#if errors.attributes}
                    <span class="text-red-500 text-sm">{errors.attributes}</span>
                {/if}
            </div>

        {:else if currentStep === 3}
            <div class="space-y-4">
                <h2 class="text-xl font-pirata">Skills and Feats</h2>
                <!-- Skill selection component would go here -->
                <!-- Feat selection component would go here -->
            </div>

        {:else if currentStep === 4}
            <div class="space-y-4">
                <h2 class="text-xl font-pirata">Equipment</h2>
                <!-- Equipment selection component would go here -->
            </div>

        {:else if currentStep === 5}
            <div class="space-y-4">
                <h2 class="text-xl font-pirata">Review and Finish</h2>
                <!-- Character summary and confirmation would go here -->
            </div>
        {/if}

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
            <button
                class="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50"
                onclick={handlePrevious}
                disabled={currentStep === 1}
            >
                Previous
            </button>

            {#if currentStep === totalSteps}
                <button
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600"
                    onclick={handleSubmit}
                >
                    Create Character
                </button>
            {:else}
                <button
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600"
                    onclick={handleNext}
                >
                    Next
                </button>
            {/if}
        </div>
    </ParchmentCell>
</div>