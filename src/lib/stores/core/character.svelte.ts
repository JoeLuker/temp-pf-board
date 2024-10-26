import { persistStore, saveState } from '$lib/stores/persistence/index.svelte';
import type { Character, Abilities, Skill, SpellInfo, Resources } from '$lib/types/character';
import { initialCharacter } from '$lib/data/initial/character';

// Define characterStore as a state rune with type Character
const characterStore = $state<Character>(persistStore('character', initialCharacter));

export { characterStore };

// Functions to update the store
export function setAbilityScore(ability: keyof Abilities, value: number) {
	characterStore.baseAttributes[ability] = value;
	characterStore.modifiers.ability[ability].base = Math.floor((value - 10) / 2);
	characterStore.modifiers.ability[ability].total =
		characterStore.modifiers.ability[ability].base +
		characterStore.modifiers.ability[ability].enhancement +
		characterStore.modifiers.ability[ability].inherent +
		characterStore.modifiers.ability[ability].penalty +
		characterStore.modifiers.ability[ability].drain;
}

export function addSkill(skill: Skill) {
	characterStore.skills = [...characterStore.skills, skill];
}

export function removeSkill(skillName: string) {
	characterStore.skills = characterStore.skills.filter((s) => s.name !== skillName);
}

export function addFeat(feat: string) {
	characterStore.feats = [...characterStore.feats, feat];
}

export function removeFeat(feat: string) {
	characterStore.feats = characterStore.feats.filter((f) => f !== feat);
}

export function addSpell(spell: SpellInfo) {
	characterStore.spellsKnown = [...characterStore.spellsKnown, spell];
}

export function removeSpell(spellName: string) {
	characterStore.spellsKnown = characterStore.spellsKnown.filter((s) => s.name !== spellName);
}

export function useResource(resource: keyof Resources, amount: number = 1) {
	if (resource === 'bombsUsed') {
		characterStore.resources.bombsUsed += amount;
	} else if (resource === 'spellsUsed') {
		const spellLevel = Math.floor(amount);
		characterStore.resources.spellsUsed[spellLevel] =
			(characterStore.resources.spellsUsed[spellLevel] || 0) + 1;
	}
}

export function addGear(item: string) {
	characterStore.equipment.gear = [...characterStore.equipment.gear, item];
}

export function removeGear(item: string) {
	characterStore.equipment.gear = characterStore.equipment.gear.filter((g) => g !== item);
}

export function addPotion(potion: string) {
	characterStore.equipment.potions = [...characterStore.equipment.potions, potion];
}

export function removePotion(potion: string) {
	characterStore.equipment.potions = characterStore.equipment.potions.filter((p) => p !== potion);
}

export function updateCurrency(amount: number) {
	characterStore.equipment.currency.gp += amount;
}
