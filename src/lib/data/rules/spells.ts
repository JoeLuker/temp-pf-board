// src/lib/data/rules/spells.ts
import type { Spell } from '$lib/types/spells';

export const alchemistSpells: Spell[] = [
	{
		name: 'Comprehend Languages',
		level: 1,
		school: 'Divination',
		castingTime: '1 standard action',
		components: ['V', 'S', 'M (a pinch of soot and salt)'],
		range: 'Personal',
		target: 'You',
		duration: '10 min./level',
		savingThrow: 'None',
		spellResistance: 'No',
		description:
			'You can understand the spoken words of creatures or read otherwise incomprehensible written messages.'
	},
	{
		name: 'Cure Light Wounds',
		level: 1,
		school: 'Conjuration (Healing)',
		castingTime: '1 standard action',
		components: ['V', 'S'],
		range: 'Touch',
		target: 'Creature touched',
		duration: 'Instantaneous',
		savingThrow: 'Will half (harmless)',
		spellResistance: 'Yes (harmless)',
		description:
			'When laying your hand upon a living creature, you channel positive energy that cures 1d8 points of damage + 1 point per caster level (maximum +5).'
	},
	{
		name: 'Enlarge Person',
		level: 1,
		school: 'Transmutation',
		castingTime: '1 round',
		components: ['V', 'S', 'M (powdered iron)'],
		range: 'Close',
		target: 'One humanoid creature',
		duration: '1 min./level',
		savingThrow: 'Fortitude negates',
		spellResistance: 'Yes',
		description:
			'This spell causes instant growth of a humanoid creature, doubling its height and multiplying its weight by 8.'
	},
	{
		name: 'Shield',
		level: 1,
		school: 'Abjuration [Force]',
		castingTime: '1 standard action',
		components: ['V', 'S'],
		range: 'Personal',
		target: 'You',
		duration: '1 min./level',
		savingThrow: 'None',
		spellResistance: 'No',
		description: 'Creates an invisible shield of force that provides a +4 shield bonus to AC.'
	},
	{
		name: "Bull's Strength",
		level: 2,
		school: 'Transmutation',
		castingTime: '1 standard action',
		components: ['V', 'S', "M (bull's hair)"],
		range: 'Touch',
		target: 'Creature touched',
		duration: '1 min./level',
		savingThrow: 'Will negates (harmless)',
		spellResistance: 'Yes (harmless)',
		description:
			'The subject becomes stronger. The spell grants a +4 enhancement bonus to Strength.'
	},
	{
		name: 'Invisibility',
		level: 2,
		school: 'Illusion (Glamer)',
		castingTime: '1 standard action',
		components: ['V', 'S', 'M (an eyelash encased in gum arabic)'],
		range: 'Personal or touch',
		target: 'You or a creature or object weighing no more than 100 lbs./level',
		duration: '1 min./level',
		savingThrow: 'Will negates (harmless) or Will negates (harmless, object)',
		spellResistance: 'Yes (harmless) or Yes (harmless, object)',
		description: 'The creature or object touched becomes invisible.'
	}
	// ... more spells can be added
];

// Helper functions for spell management
export function getSpellsByLevel(level: number): Spell[] {
	return alchemistSpells.filter((spell) => spell.level === level);
}

export function findSpell(name: string): Spell | undefined {
	return alchemistSpells.find((spell) => spell.name.toLowerCase() === name.toLowerCase());
}

export function getSpellLevels(): number[] {
	return Array.from(new Set(alchemistSpells.map((spell) => spell.level))).sort();
}
