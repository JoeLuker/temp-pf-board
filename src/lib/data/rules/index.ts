// src/lib/data/rules/index.ts
export type { GameRules, RaceDefinition } from '$lib/data/rules/core';
export { GAME_RULES } from '$lib/data/rules/core';
export { calculations } from '$lib/data/rules/calculations';
export {
	skillDefinitions,
	classSkills,
	skillList,
	alchemistClassSkills,
	type SkillKey,
	SKILL_TO_ABILITY_MAP
} from './skills.svelte';
export { alchemistSpells, getSpellsByLevel, findSpell, getSpellLevels } from './spells';
export { armorData } from '../equipment/armor';
export { wondrousItemData } from '../equipment/wondrous';
