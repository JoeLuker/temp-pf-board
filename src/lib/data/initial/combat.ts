// src/lib/data/initial/combat.ts
import type { CombatStats } from '$lib/types/character';

export const initialCombat: CombatStats = {
	ac: {
		base: 10,
		armor: 0,
		shield: 0,
		dex: 0,
		size: 0,
		natural: 0,
		deflection: 0,
		misc: 0,
		total: 10,
		touch: 10,
		flatFooted: 10
	},
	initiative: {
		dex: 0,
		misc: 0,
		total: 0
	},
	saves: {
		fortitude: { base: 0, ability: 0, magic: 0, misc: 0, temp: 0, total: 0 },
		reflex: { base: 0, ability: 0, magic: 0, misc: 0, temp: 0, total: 0 },
		will: { base: 0, ability: 0, magic: 0, misc: 0, temp: 0, total: 0 }
	},
	attacks: {
		bab: 0,
		cmb: 0,
		cmd: 10,
		meleeBonus: 0,
		rangedBonus: 0
	}
};
