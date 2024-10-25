// src/lib/data/initial/character.ts
import { initialAbilities } from './abilities';
import { initialEquipment } from './equipment';
import { initialCombat } from './combat';
import { initialModifiers } from './modifiers'; // New file needed
import type { Character } from '$lib/types/character';

export const initialCharacter: Character = { // Not Partial anymore
    name: 'New Character',
    playerName: '',
    level: 1,
    race: '',
    class: '',
    baseAttributes: initialAbilities,
    baseHP: 0,
    tempHP: 0,
    nonlethalDamage: 0,
    skills: [],
    feats: [],
    classFeatures: {
        discoveries: []
    },
    spellsKnown: [],
    equipment: initialEquipment,
    resources: {
        bombsUsed: 0,
        spellsUsed: {}
    },
    combat: initialCombat,
    modifiers: initialModifiers,
    bonuses: {
        ac: [],
        saves: {
            fortitude: [],
            reflex: [],
            will: []
        },
        abilities: {},
        skills: {},
        attack: [],
        damage: [],
        initiative: []
    },
    experience: {
        current: 0,
        nextLevel: 2000
    },
    conditions: []
};