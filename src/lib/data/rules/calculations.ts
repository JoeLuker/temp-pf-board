// src/lib/data/rules/calculations.ts
import type { Character, Abilities } from '$lib/types/character';

export const calculations = {
    abilityModifier: (score: number): number => Math.floor((score - 10) / 2),
    
    baseAttackBonus: (level: number, progression: 'good' | 'medium' | 'poor'): number => {
        const rates = { good: 1, medium: 0.75, poor: 0.5 };
        return Math.floor(level * rates[progression]);
    },
    
    savingThrow: (
        level: number,
        abilityMod: number,
        isGood: boolean,
        magic: number = 0,
        misc: number = 0
    ): number => {
        const base = isGood ? 2 + Math.floor(level / 2) : Math.floor(level / 3);
        return base + abilityMod + magic + misc;
    },
    
    skillModifier: (
        ranks: number,
        abilityMod: number,
        isClassSkill: boolean,
        misc: number = 0
    ): number => {
        const classBonus = (isClassSkill && ranks > 0) ? 3 : 0;
        return ranks + abilityMod + classBonus + misc;
    },

    armorClass: (character: Character): number => {
        let ac = 10;
        const dexMod = calculations.abilityModifier(character.baseAttributes.dex);
        const maxDex = character.equipment.worn.armor?.maxDex ?? Infinity;
        
        return ac 
            + (character.equipment.worn.armor?.acBonus || 0)
            + (character.equipment.worn.shield?.acBonus || 0)
            + Math.min(dexMod, maxDex)
            + (character.combat.ac.natural || 0)
            + (character.combat.ac.deflection || 0)
            + (character.combat.ac.misc || 0);
    },

    // Add more calculations as needed
};

export default calculations;