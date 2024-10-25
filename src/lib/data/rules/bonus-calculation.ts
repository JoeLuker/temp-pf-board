// src/lib/data/rules/bonus-calculation.ts
import type { Character } from '$lib/types/character';
import type { BonusMap, BonusType, Bonus } from '$lib/types/bonuses';

export function calculateBonuses(character: Character, target: keyof BonusMap): number {
    const bonusList = character.bonuses[target] as Bonus[] | undefined;
    if (!bonusList) return 0;

    // Group bonuses by type
    const bonusesByType = bonusList.reduce((acc, bonus) => {
        if (!acc[bonus.type]) acc[bonus.type] = [];
        acc[bonus.type].push(bonus);
        return acc;
    }, {} as Record<BonusType, Bonus[]>);

    // Calculate total bonus
    return Object.entries(bonusesByType).reduce((total, [type, bonuses]) => {
        // Untyped bonuses stack
        if (type === 'untyped') {
            return total + bonuses.reduce((sum, b) => sum + b.value, 0);
        }
        // For other types, take the highest value
        return total + Math.max(...bonuses.map(b => b.value));
    }, 0);
}

export function calculateAC(character: Character): number {
    let ac = 10; // Base AC

    // Add armor bonus
    if (character.equipment.worn.armor) {
        ac += character.equipment.worn.armor.acBonus;
    }

    // Add shield bonus
    if (character.equipment.worn.shield) {
        ac += character.equipment.worn.shield.acBonus;
    }

    // Add Dex bonus (limited by max dex from armor)
    const dexMod = character.modifiers.ability.dex.total;
    const maxDex = character.equipment.worn.armor?.maxDex ?? Infinity;
    ac += Math.min(dexMod, maxDex);

    // Add other bonuses
    ac += calculateBonuses(character, 'ac');

    return ac;
}