// src/lib/types/stores.ts
import type { Writable } from 'svelte/store';
import type { Character, Abilities, Skill, SpellInfo, Resources } from './character';

export interface CharacterStore extends Writable<Character> {
    setAbilityScore: (ability: keyof Abilities, value: number) => void;
    addSkill: (skill: Skill) => void;
    addFeat: (feat: string) => void;
    addSpell: (spell: SpellInfo) => void;
    useResource: (resource: keyof Resources, amount?: number) => void;
    reset: () => void;
}
