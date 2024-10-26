// src/lib/types/equipment.ts
import type { BonusMap } from '$lib/types/bonuses';

export interface ArmorItem {
	id: string;
	name: string;
	type: 'light' | 'medium' | 'heavy' | 'shield';
	acBonus: number;
	maxDex?: number;
	armorCheckPenalty: number;
	arcaneSpellFailure: number;
	speed30: number;
	speed20: number;
	cost: number;
	weight: number;
	properties?: string[];
	material?: {
		type: 'mithral' | 'adamantine' | 'standard';
		modifiers: {
			acBonus?: number;
			maxDex?: number;
			armorCheckPenalty?: number;
			arcaneSpellFailure?: number;
			weight?: number;
		};
	};
}

export interface WeaponItem {
	id: string;
	name: string;
	type: 'simple' | 'martial' | 'exotic';
	category: 'light' | 'one-handed' | 'two-handed' | 'ranged';
	damage: {
		small: string;
		medium: string;
	};
	critical: {
		multiplier: number;
		threat: number;
	};
	range?: number;
	weight: number;
	damageType: Array<'slashing' | 'piercing' | 'bludgeoning'>;
	special?: string[];
	masterwork?: boolean;
	material?: string;
}

export type WondrousSlot =
	| 'head'
	| 'headband'
	| 'eyes'
	| 'shoulders'
	| 'neck'
	| 'chest'
	| 'body'
	| 'armor'
	| 'belt'
	| 'wrists'
	| 'hands'
	| 'rings'
	| 'feet';

export interface WondrousItem {
	id: string;
	name: string;
	slot?: WondrousSlot;
	bonuses: BonusMap;
	cost: number;
	weight: number;
	description: string;
}

export interface InventoryItem {
	id: string;
	name: string;
	quantity: number;
	weight: number;
	cost: number;
	description?: string;
}

export interface Container {
	name: string;
	items: InventoryItem[];
	capacity: number;
}

export interface Equipment {
	worn: {
		armor?: ArmorItem;
		shield?: ArmorItem;
		wondrous: Partial<Record<WondrousSlot, WondrousItem>>;
	};
	weapons: WeaponItem[];
	inventory: InventoryItem[];
	containers?: Container[];
	gear: string[];
	potions: string[];
	currency: {
		gp: number;
		sp?: number;
		cp?: number;
	};
}
