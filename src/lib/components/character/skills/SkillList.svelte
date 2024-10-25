<!-- @migration-task Error while migrating Svelte code: 'onsubmit|preventDefault' is not a valid attribute name -->
<!-- src/lib/components/character/skills/SkillList.svelte -->
<script lang="ts">
    import { characterState, addSkill } from '$lib/stores/core/character';
    import { abilityModifiersDerived } from '$lib/stores/derived';
    import { SKILL_LIST, ALCHEMIST_CLASS_SKILLS } from '$lib/data/rules/skills';
    
    import { calculateSkillModifier } from '$lib/data/rules/game-rules';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import type { Skill } from '$lib/types/character';

    let newSkillName = '';
    let newSkillRanks = 0;

    import type { SkillKey } from '$lib/types/skills';

    function addNewSkill() {
        if (newSkillName && newSkillRanks > 0) {
            const isClassSkill = ALCHEMIST_CLASS_SKILLS.includes(newSkillName as SkillKey);
            addSkill({
                name: newSkillName,
                ranks: newSkillRanks,
                isClassSkill
            });
            newSkillName = '';
            newSkillRanks = 0;
        }
    }

    function getAbilityModForSkill(skillName: string): number {
        // Map skills to their key abilities
        const skillAbilities: Record<string, keyof Abilities> = {
            'Acrobatics': 'dex',
            'Appraise': 'int',
            'Bluff': 'cha',
            'Climb': 'str',
            'Craft': 'int',
            'Diplomacy': 'cha',
            'Disable Device': 'dex',
            'Disguise': 'cha',
            'Escape Artist': 'dex',
            'Fly': 'dex',
            'Handle Animal': 'cha',
            'Heal': 'wis',
            'Intimidate': 'cha',
            'Knowledge': 'int',
            'Linguistics': 'int',
            'Perception': 'wis',
            'Perform': 'cha',
            'Profession': 'wis',
            'Ride': 'dex',
            'Sense Motive': 'wis',
            'Sleight of Hand': 'dex',
            'Spellcraft': 'int',
            'Stealth': 'dex',
            'Survival': 'wis',
            'Swim': 'str',
            'Use Magic Device': 'cha'
        };

        const ability = skillAbilities[skillName] || 'int';
        return abilityModifiersDerived[ability] || 0;
    }

    $: availableSkills = Object.keys(SKILL_LIST).filter(
        skill => !$characterState.skills.some(s => s.name === skill)
    );

    $: maxRanks = $characterState.level;
</script>

<div class="space-y-4">
    <!-- Existing Skills -->
    {#each $characterState.skills as skill}
        <ParchmentCell title={skill.name}>
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-pirata text-lg text-yellow-900">{skill.name}</h4>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-yellow-700">
                            Ranks: {skill.ranks}
                        </span>
                        {#if skill.isClassSkill}
                            <span class="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                                Class Skill
                            </span>
                        {/if}
                    </div>
                </div>
                <div class="text-xl font-bold text-yellow-900">
                    {#if calculateSkillModifier(
                        skill.ranks,
                        getAbilityModForSkill(skill.name),
                        skill.isClassSkill
                    ) >= 0}+{/if}
                    {calculateSkillModifier(
                        skill.ranks,
                        getAbilityModForSkill(skill.name),
                        skill.isClassSkill
                    )}
                </div>
            </div>
        </ParchmentCell>
    {/each}

    <!-- Add New Skill -->
    <ParchmentCell>
        <form 
            onsubmit|preventDefault={addNewSkill}
            class="space-y-4"
        >
            <div class="flex gap-4">
                <select
                    bind:value={newSkillName}
                    class="flex-1 p-2 rounded border border-yellow-200 bg-yellow-50"
                >
                    <option value="">Select a skill</option>
                    {#each availableSkills as skill}
                        <option value={skill}>{skill}</option>
                    {/each}
                </select>

                <input
                    type="number"
                    bind:value={newSkillRanks}
                    min="0"
                    max={maxRanks}
                    placeholder="Ranks"
                    class="w-24 p-2 rounded border border-yellow-200 bg-yellow-50"
                />

                <button
                    type="submit"
                    class="px-4 py-2 bg-yellow-700 text-yellow-50 rounded hover:bg-yellow-600 transition-colors"
                    disabled={!newSkillName || newSkillRanks <= 0}
                >
                    Add Skill
                </button>
            </div>
        </form>
    </ParchmentCell>
</div>
