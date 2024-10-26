// src/lib/types/bonuses.ts
import type { Abilities } from './character';

export type BonusType =
	| 'enhancement'
	| 'armor'
	| 'shield'
	| 'natural'
	| 'deflection'
	| 'size'
	| 'dodge'
	| 'insight'
	| 'luck'
	| 'morale'
	| 'profane'
	| 'sacred'
	| 'trait'
	| 'racial'
	| 'resistance'
	| 'competence'
	| 'inherent'
	| 'alchemical'
	| 'circumstance'
	| 'penalty'
	| 'untyped';

export interface Bonus {
	value: number;
	type: BonusType;
	source: string;
	condition?: string;
	duration?: number;
}

export type BonusMap = {
	ac?: Bonus[];
	saves?: {
		fortitude?: Bonus[];
		reflex?: Bonus[];
		will?: Bonus[];
	};
	abilities?: Partial<Record<keyof Abilities, Bonus[]>>;
	skills?: Record<string, Bonus[]>;
	attack?: Bonus[];
	damage?: Bonus[];
	initiative?: Bonus[];
};
