<script lang="ts">
    import { page } from '$app/stores';
    import { character } from '$lib/stores/core/character';
    import {
        AbilityScores,
        CombatStats,
        FeatList,
        SpellBook,
        SkillList,
        EquipmentList
    } from '$lib/components/character';
</script>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AbilityScores />
        <CombatStats />
        <FeatList />
        <SpellBook />
        <SkillList />
        <EquipmentList />
    </div>
</div>
