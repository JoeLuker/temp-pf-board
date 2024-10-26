// src/lib/types/character.ts
import type { Equipment } from './equipment';
import type { BonusMap } from './bonuses';

export interface Abilities {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
}

export interface AbilityModifiers {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface Skill {
	name: string;
	ranks: number;
	isClassSkill: boolean;
}

export interface SpellInfo {
	level: number;
	name: string;
}

export interface Character {
	name: string;
	playerName: string;
	level: number;
	race: string;
	class: string;
	baseAttributes: Abilities;
	baseHP: number;
	tempHP: number;
	nonlethalDamage: number;
	skills: Skill[];
	feats: string[];
	classFeatures: {
		discoveries: string[];
		[key: string]: unknown;
	};
	spellsKnown: SpellInfo[];
	equipment: Equipment;
	resources: {
		bombsUsed: number;
		spellsUsed: Record<number, number>;
	};
	combat: CombatStats;
	modifiers: CharacterModifiers;
	bonuses: BonusMap;
	experience: {
		current: number;
		nextLevel: number;
	};
	conditions: string[];
}

export interface CombatStats {
	ac: {
		base: number;
		armor: number;
		shield: number;
		dex: number;
		size: number;
		natural: number;
		deflection: number;
		misc: number;
		total: number;
		touch: number;
		flatFooted: number;
	};
	initiative: {
		dex: number;
		misc: number;
		total: number;
	};
	saves: {
		fortitude: SaveStats;
		reflex: SaveStats;
		will: SaveStats;
	};
	attacks: {
		bab: number;
		cmb: number;
		cmd: number;
		meleeBonus: number;
		rangedBonus: number;
	};
}

export interface SaveStats {
	base: number;
	ability: number;
	magic: number;
	misc: number;
	temp: number;
	total: number;
}

export interface CharacterModifiers {
	ability: Record<
		keyof Abilities,
		{
			base: number;
			enhancement: number;
			inherent: number;
			penalty: number;
			drain: number;
			total: number;
		}
	>;
	skills: Record<
		string,
		{
			ranks: number;
			classSkill: number;
			ability: number;
			misc: number;
			total: number;
		}
	>;
}

export interface Resources {
	/**
	 * Tracks the number of bombs used by the character
	 */
	bombsUsed: number;

	/**
	 * Tracks the number of spells used per spell level
	 * Key is the spell level (0-9), value is the number of spells used at that level
	 */
	spellsUsed: Record<number, number>;
}
