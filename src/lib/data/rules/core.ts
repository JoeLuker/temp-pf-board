// src/lib/data/rules/core.ts
import type { ClassDefinition } from '$lib/types/rules';

export interface RaceDefinition {
    name: string;
    abilityScoreModifiers: Record<string, number>;
    traits: string[];
    size: 'small' | 'medium' | 'large';
}

export interface GameRules {
    abilities: {
        minScore: number;
        maxScore: number;
        pointBuyCost: Record<number, number>;
    };
    classes: Record<string, ClassDefinition>;
    races: Record<string, RaceDefinition>;
}

export const GAME_RULES: GameRules = {
    abilities: {
        minScore: 3,
        maxScore: 18,
        pointBuyCost: {
            7: -4, 8: -2, 9: -1, 10: 0, 11: 1, 12: 2,
            13: 3, 14: 5, 15: 7, 16: 10, 17: 13, 18: 17
        }
    },
    classes: {},  // Add class definitions
    races: {}     // Add race definitions
};