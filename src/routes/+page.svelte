<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { characterState } from '$lib/stores/core/character';
    import { abilityModifiersDerived, combatStatsDerived } from '$lib/stores/derived';
    import {
        AbilityScores,
        CombatStats as CombatStatsComponent,
        FeatList,
        SpellBook,
        SkillList,
        EquipmentList,
        CharacterBasicInfo
    } from '$lib/components/character';
    import ResourceTracker from '$lib/components/shared/inputs/ResourceTracker.svelte';
    import { calculateMaxBombsPerDay } from '$lib/data/rules/game-rules';
    import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
    import SectionHeader from '$lib/components/shared/layout/SectionHeader.svelte';
    import { useResource } from '$lib/stores/core/character';
    
    // Calculate max bombs per day
    let maxBombs = calculateMaxBombsPerDay($characterState.level, $abilityModifiersDerived.int);

    // Handle resource usage
    function handleBombUsage(event: CustomEvent<{ used: number; spellLevel?: number }>) {
        useResource('bombsUsed', event.detail.used - $characterState.resources.bombsUsed);
    }
</script>

<div class="min-h-screen bg-[url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98')] bg-cover bg-center">
    <div class="container mx-auto px-4 py-8">
        <!-- Header Section -->
        <CharacterBasicInfo />
        
        <!-- Combat Stats Quick View -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ParchmentCell title="HP">
                <div class="text-center">
                    <h3 class="font-pirata text-xl mb-2">HP</h3>
                    <p class="text-2xl font-bold">{$characterState.baseHP}</p>
                </div>
            </ParchmentCell>
            
            <ParchmentCell title="AC">
                <div class="text-center">
                    <h3 class="font-pirata text-xl mb-2">AC</h3>
                    <p class="text-2xl font-bold">{$combatStatsDerived.ac.total}</p>
                    <p class="text-sm">Touch: {$combatStatsDerived.ac.touch} | FF: {$combatStatsDerived.ac.flatFooted}</p>
                </div>
            </ParchmentCell>
            
            <ParchmentCell title="Initiative">
                <div class="text-center">
                    <h3 class="font-pirata text-xl mb-2">Initiative</h3>
                    <p class="text-2xl font-bold">{$abilityModifiersDerived.dex >= 0 ? '+' : ''}{$abilityModifiersDerived.dex}</p>
                </div>
            </ParchmentCell>
        </div>

        <!-- Main Character Sheet Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column -->
            <div class="space-y-8">
                <SectionHeader title="Abilities" id="abilities">
                    <AbilityScores />
                </SectionHeader>
                
                <SectionHeader title="Combat" id="combat">
                    <CombatStatsComponent />
                </SectionHeader>
                
                <SectionHeader title="Resources" id="resources">
                    <ParchmentCell>
                        <ResourceTracker
                            label="Bombs"
                            type="bombs"
                            total={maxBombs}
                            used={$characterState.resources.bombsUsed}
                            onchange={handleBombUsage}
                        />
                    </ParchmentCell>
                </SectionHeader>
            </div>

            <!-- Middle Column -->
            <div class="space-y-8">
                <SectionHeader title="Skills" id="skills">
                    <SkillList />
                </SectionHeader>
                
                <SectionHeader title="Feats" id="feats">
                    <FeatList />
                </SectionHeader>
            </div>

            <!-- Right Column -->
            <div class="space-y-8">
                <SectionHeader title="Spellbook" id="spellbook">
                    <SpellBook />
                </SectionHeader>
                
                <SectionHeader title="Equipment" id="equipment">
                    <EquipmentList />
                </SectionHeader>
            </div>
        </div>
    </div>
</div>
