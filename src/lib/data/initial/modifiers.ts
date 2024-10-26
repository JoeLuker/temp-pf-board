// src/lib/data/initial/modifiers.ts
import type { CharacterModifiers } from '$lib/types/character';

const createAbilityModifier = () => ({
	base: 0,
	enhancement: 0,
	inherent: 0,
	penalty: 0,
	drain: 0,
	total: 0
});

export const initialModifiers: CharacterModifiers = {
	ability: {
		str: createAbilityModifier(),
		dex: createAbilityModifier(),
		con: createAbilityModifier(),
		int: createAbilityModifier(),
		wis: createAbilityModifier(),
		cha: createAbilityModifier()
	},
	skills: {}
};
