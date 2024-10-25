// src/lib/stores/derived/index.ts
import { derived } from 'svelte';
import type { AbilityModifiers } from '$lib/types/character';
import { characterState } from '../core/character';
import { abilityModifiersDerived } from './abilityModifiers';

export const combatStatsDerived = derived([characterState, abilityModifiersDerived], ([$char, $mods]) => ({
    bab: Math.floor($char.level * 0.75),
    ac: {
        total: 10 + ($mods.dex || 0),
        touch: 10 + ($mods.dex || 0),
        flatFooted: 10
    },
    cmb: Math.floor($char.level * 0.75) + ($mods.str || 0),
    cmd: 10 + Math.floor($char.level * 0.75) + ($mods.str || 0) + ($mods.dex || 0)
}));
