// src/lib/types/skills.ts

import type { Abilities } from './character';

export enum SkillKey {
	Acrobatics = 'acrobatics',
	Appraise = 'appraise',
	Bluff = 'bluff',
	Climb = 'climb',
	Craft = 'craft',
	Diplomacy = 'diplomacy',
	DisableDevice = 'disableDevice',
	Disguise = 'disguise',
	EscapeArtist = 'escapeArtist',
	Fly = 'fly',
	HandleAnimal = 'handleAnimal',
	Heal = 'heal',
	Intimidate = 'intimidate',
	KnowledgeArcana = 'knowledge.arcana',
	KnowledgeDungeoneering = 'knowledge.dungeoneering',
	KnowledgeEngineering = 'knowledge.engineering',
	KnowledgeGeography = 'knowledge.geography',
	KnowledgeHistory = 'knowledge.history',
	KnowledgeLocal = 'knowledge.local',
	KnowledgeNature = 'knowledge.nature',
	KnowledgeNobility = 'knowledge.nobility',
	KnowledgePlanes = 'knowledge.planes',
	KnowledgeReligion = 'knowledge.religion',
	Linguistics = 'linguistics',
	Perception = 'perception',
	Perform = 'perform',
	Profession = 'profession',
	Ride = 'ride',
	SenseMotive = 'senseMotive',
	SleightOfHand = 'sleightOfHand',
	Spellcraft = 'spellcraft',
	Stealth = 'stealth',
	Survival = 'survival',
	Swim = 'swim',
	UseMagicDevice = 'useMagicDevice'
}

export interface SkillDefinition {
	ability: keyof Abilities;
	trainedOnly: boolean;
	armorCheckPenalty: boolean;
}

export type SkillMap = Record<SkillKey, SkillDefinition>;
