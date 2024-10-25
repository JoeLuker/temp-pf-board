// src/lib/data/rules/index.ts
export type { GameRules, RaceDefinition } from '$lib/data/rules/core';
export { GAME_RULES, ABILITY_MODS } from '$lib/data/rules/core';
export { calculations } from '$lib/data/rules/calculations';
export {
    SKILL_DEFINITIONS,
    CLASS_SKILLS,
    SKILL_LIST,
    ALCHEMIST_CLASS_SKILLS,
    type SkillKey
} from './skills';
export { alchemistSpells, getSpellsByLevel, findSpell, getSpellLevels } from './spells';
export { armorData } from '../equipment/armor';
export { wondrousItemData } from '../equipment/wondrous';