// src/lib/data/rules/game-rules.ts
export const calculateModifier = (score: number): number => {
	return Math.floor((score - 10) / 2);
};

export const calculateBAB = (level: number, progression: 'good' | 'medium' | 'poor'): number => {
	const progressions = {
		good: 1,
		medium: 0.75,
		poor: 0.5
	};
	return Math.floor(level * progressions[progression]);
};

export const calculateSave = (
	level: number,
	baseAbilityMod: number,
	isGood: boolean,
	miscMod: number = 0
): number => {
	const base = isGood ? 2 + Math.floor(level / 2) : Math.floor(level / 3);
	return base + baseAbilityMod + miscMod;
};

export const skillRanksPerLevel = {
	alchemist: 4,
	barbarian: 4,
	bard: 6,
	cleric: 2,
	druid: 4,
	fighter: 2,
	monk: 4,
	paladin: 2,
	ranger: 6,
	rogue: 8,
	sorcerer: 2,
	wizard: 2
};

export const calculateSkillModifier = (
	ranks: number,
	abilityMod: number,
	isClassSkill: boolean,
	miscMod: number = 0
): number => {
	const classSkillBonus = isClassSkill && ranks > 0 ? 3 : 0;
	return ranks + abilityMod + classSkillBonus + miscMod;
};

export const calculateMaxBombsPerDay = (level: number, intModifier: number): number => {
	return level + intModifier;
};

export const calculateSpellsPerDay = (
	level: number,
	spellLevel: number,
	abilityMod: number
): number => {
	// Base spells per day calculation
	const baseSpells = Math.max(0, Math.floor((level + 3) / 2) - spellLevel);
	// Bonus spells from high ability score
	const bonusSpells = Math.max(0, Math.floor((abilityMod - spellLevel + 1) / 4));
	return baseSpells + bonusSpells;
};
