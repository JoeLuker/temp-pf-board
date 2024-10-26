// src/lib/data/initial/equipment.ts
import type { Equipment } from '$lib/types/equipment';

export const initialEquipment: Equipment = {
	worn: {
		wondrous: {}
	},
	weapons: [],
	inventory: [],
	containers: [],
	gear: [],
	potions: [],
	currency: {
		gp: 0,
		sp: 0,
		cp: 0
	}
};
