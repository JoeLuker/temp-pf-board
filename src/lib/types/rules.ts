// src/lib/types/rules.ts
export interface SpellDefinition {
	name: string;
	level: number;
	school: string;
	castingTime: string;
	components: string[];
	range: string;
	target: string;
	duration: string;
	savingThrow: string;
	spellResistance: string;
	description: string;
}

export interface ClassDefinition {
	name: string;
	hitDie: number;
	skillRanksPerLevel: number;
	baseAttackBonus: 'good' | 'medium' | 'poor';
	goodSaves: ('fortitude' | 'reflex' | 'will')[];
	classSkills: string[];
	classFeatures: Record<number, string[]>;
}
