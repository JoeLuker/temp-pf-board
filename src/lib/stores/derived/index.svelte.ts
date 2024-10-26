// src/lib/stores/derived/index.svelte.ts

import { characterStore } from '$lib/stores/core/character.svelte';
import type { AbilityModifiers, CombatStats } from '$lib/types/character';

export function getAbilityModifiers(): AbilityModifiers {
	const char = characterStore;
	return {
		str: Math.floor((char.baseAttributes.str - 10) / 2),
		dex: Math.floor((char.baseAttributes.dex - 10) / 2),
		con: Math.floor((char.baseAttributes.con - 10) / 2),
		int: Math.floor((char.baseAttributes.int - 10) / 2),
		wis: Math.floor((char.baseAttributes.wis - 10) / 2),
		cha: Math.floor((char.baseAttributes.cha - 10) / 2)
	};
}

export function getCombatStats(): CombatStats {
	const char = characterStore;
	const mods = getAbilityModifiers();
	return {
		initiative: {
			dex: mods.dex || 0,
			misc: 0,
			total: (mods.dex || 0)
		},
		saves: {
			fortitude: {
				base: Math.floor(char.level / 3),
				ability: mods.con || 0,
				magic: 0,
				misc: 0,
				temp: 0,
				total: (mods.con || 0) + Math.floor(char.level / 3)
			},
			reflex: {
				base: Math.floor(char.level / 3),
				ability: mods.dex || 0,
				magic: 0,
				misc: 0,
				temp: 0,
				total: (mods.dex || 0) + Math.floor(char.level / 3)
			},
			will: {
				base: Math.floor(char.level / 2),
				ability: mods.wis || 0,
				magic: 0,
				misc: 0,
				temp: 0,
				total: (mods.wis || 0) + Math.floor(char.level / 2)
			}
		},
		attacks: {
			bab: Math.floor(char.level * 0.75),
			cmb: Math.floor(char.level * 0.75) + (mods.str || 0),
			cmd: 10 + Math.floor(char.level * 0.75) + (mods.str || 0) + (mods.dex || 0),
            meleeBonus: 0,
            rangedBonus: 0
        },
		ac: {
            total: 10 + (mods.dex || 0),
            touch: 10 + (mods.dex || 0),
            flatFooted: 10,
			base: 0,
			armor: 0,
			shield: 0,
			dex: 0,
			size: 0,
			natural: 0,
			deflection: 0,
			misc: 0
		}
	};
}
