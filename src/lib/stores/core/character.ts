// src/lib/stores/core/character.ts
import { persistStore } from '../persistence';
import { state } from 'svelte';
import type { Character, Abilities, Skill, SpellInfo, Resources } from '$lib/types/character';
import { initialCharacter } from '$lib/data/initial/character';

/**
 * Create a reactive state with persisted data
 */
export const characterState = persistStore<Character>('currentCharacter', initialCharacter);

/**
 * Store manipulation functions using $state
 */
export function setAbilityScore(ability: keyof Abilities, value: number) {
    characterState.update(char => ({
        ...char,
        baseAttributes: {
            ...char.baseAttributes,
            [ability]: value
        },
        modifiers: {
            ...char.modifiers,
            ability: {
                ...char.modifiers.ability,
                [ability]: {
                    ...char.modifiers.ability[ability],
                    base: Math.floor((value - 10) / 2),
                    total: Math.floor((value - 10) / 2) + char.modifiers.ability[ability].enhancement
                }
            }
        }
    }));
}

export function addSkill(skill: Skill) {
    characterState.update(char => ({
        ...char,
        skills: [...char.skills, skill]
    }));
}

export function removeSkill(skillName: string) {
    characterState.update(char => ({
        ...char,
        skills: char.skills.filter(s => s.name !== skillName)
    }));
}

export function addFeat(feat: string) {
    characterState.update(char => ({
        ...char,
        feats: [...char.feats, feat]
    }));
}

export function removeFeat(feat: string) {
    characterState.update(char => ({
        ...char,
        feats: char.feats.filter(f => f !== feat)
    }));
}

export function addSpell(spell: SpellInfo) {
    characterState.update(char => ({
        ...char,
        spellsKnown: [...char.spellsKnown, spell]
    }));
}

export function removeSpell(spellName: string) {
    characterState.update(char => ({
        ...char,
        spellsKnown: char.spellsKnown.filter(s => s.name !== spellName)
    }));
}

export function addGear(gearItem: string) {
    characterState.update(char => ({
        ...char,
        equipment: {
            ...char.equipment,
            gear: [...char.equipment.gear, gearItem]
        }
    }));
}

export function removeGear(gearItem: string) {
    characterState.update(char => ({
        ...char,
        equipment: {
            ...char.equipment,
            gear: char.equipment.gear.filter(g => g !== gearItem)
        }
    }));
}

export function addPotion(potion: string) {
    characterState.update(char => ({
        ...char,
        equipment: {
            ...char.equipment,
            potions: [...char.equipment.potions, potion]
        }
    }));
}

export function removePotion(potion: string) {
    characterState.update(char => ({
        ...char,
        equipment: {
            ...char.equipment,
            potions: char.equipment.potions.filter(p => p !== potion)
        }
    }));
}

export function updateCurrency(gp: number, sp: number = 0, cp: number = 0) {
    characterState.update(char => ({
        ...char,
        equipment: {
            ...char.equipment,
            currency: {
                gp: (char.equipment.currency.gp || 0) + gp,
                sp: (char.equipment.currency.sp || 0) + sp,
                cp: (char.equipment.currency.cp || 0) + cp
            }
        }
    }));
}

export function useResource(resource: keyof Resources, amount: number = 1) {
    characterState.update(char => ({
        ...char,
        resources: {
            ...char.resources,
            [resource]: (char.resources[resource] || 0) + amount
        }
    }));
}

export function resetCharacter() {
    characterState.set(initialCharacter);
}
