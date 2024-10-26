// src/lib/data/equipment/armor.ts
import type { ArmorItem } from '$lib/types/equipment';

export const armorData: Record<string, ArmorItem> = {
	'mithral-chain-shirt': {
		id: 'mithral-chain-shirt',
		name: 'Mithral Chain Shirt',
		type: 'light',
		acBonus: 4,
		maxDex: 6,
		armorCheckPenalty: 0,
		arcaneSpellFailure: 10,
		speed30: 30,
		speed20: 20,
		cost: 1100,
		weight: 10,
		material: {
			type: 'mithral',
			modifiers: {
				maxDex: 2,
				armorCheckPenalty: 2,
				arcaneSpellFailure: -10,
				weight: -0.5
			}
		}
	}
};
