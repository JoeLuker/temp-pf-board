import type { Abilities } from '$lib/types/character';
import type { SkillDefinition } from '$lib/types/skills';
import { SkillKey } from '$lib/types/skills';

// Type the map properly with string literal types
export const SKILL_TO_ABILITY_MAP: { [K in SkillKey]: keyof Abilities } = {
    [SkillKey.Acrobatics]: 'dex',
    [SkillKey.Appraise]: 'int',
    [SkillKey.Bluff]: 'cha',
    [SkillKey.Climb]: 'str',
    [SkillKey.Craft]: 'int',
    [SkillKey.Diplomacy]: 'cha',
    [SkillKey.DisableDevice]: 'dex',
    [SkillKey.Disguise]: 'cha',
    [SkillKey.EscapeArtist]: 'dex',
    [SkillKey.Fly]: 'dex',
    [SkillKey.HandleAnimal]: 'cha',
    [SkillKey.Heal]: 'wis',
    [SkillKey.Intimidate]: 'cha',
    [SkillKey.KnowledgeArcana]: 'int',
    [SkillKey.KnowledgeDungeoneering]: 'int',
    [SkillKey.KnowledgeEngineering]: 'int',
    [SkillKey.KnowledgeGeography]: 'int',
    [SkillKey.KnowledgeHistory]: 'int',
    [SkillKey.KnowledgeLocal]: 'int',
    [SkillKey.KnowledgeNature]: 'int',
    [SkillKey.KnowledgeNobility]: 'int',
    [SkillKey.KnowledgePlanes]: 'int',
    [SkillKey.KnowledgeReligion]: 'int',
    [SkillKey.Linguistics]: 'int',
    [SkillKey.Perception]: 'wis',
    [SkillKey.Perform]: 'cha',
    [SkillKey.Profession]: 'wis',
    [SkillKey.Ride]: 'dex',
    [SkillKey.SenseMotive]: 'wis',
    [SkillKey.SleightOfHand]: 'dex',
    [SkillKey.Spellcraft]: 'int',
    [SkillKey.Stealth]: 'dex',
    [SkillKey.Survival]: 'wis',
    [SkillKey.Swim]: 'str',
    [SkillKey.UseMagicDevice]: 'cha'
} as const;

export const skillList: SkillKey[] = Object.values(SkillKey);

export const alchemistClassSkills: SkillKey[] = [
    SkillKey.Appraise,
    SkillKey.Craft,
    SkillKey.DisableDevice,
    SkillKey.Fly,
    SkillKey.Heal,
    SkillKey.KnowledgeArcana,
    SkillKey.KnowledgeNature,
    SkillKey.Perception,
    SkillKey.Profession,
    SkillKey.SleightOfHand,
    SkillKey.Spellcraft,
    SkillKey.Survival,
    SkillKey.UseMagicDevice
];

export const skillDefinitions = {
    // Skill definitions would go here
};

export const classSkills = {
    // Class skills would go here
};

export const SKILL_DEFINITIONS: { [K in SkillKey]: SkillDefinition } = {
    [SkillKey.Acrobatics]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Appraise]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Bluff]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Climb]: {
        ability: 'str',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Craft]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Diplomacy]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.DisableDevice]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Disguise]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.EscapeArtist]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Fly]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.HandleAnimal]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Heal]: {
        ability: 'wis',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Intimidate]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeArcana]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeDungeoneering]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeEngineering]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeGeography]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeHistory]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeLocal]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeNature]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeNobility]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgePlanes]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.KnowledgeReligion]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Linguistics]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Perception]: {
        ability: 'wis',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Perform]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Profession]: {
        ability: 'wis',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Ride]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.SenseMotive]: {
        ability: 'wis',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.SleightOfHand]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Spellcraft]: {
        ability: 'int',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Stealth]: {
        ability: 'dex',
        trainedOnly: false,
        armorCheckPenalty: true
    },
    [SkillKey.Survival]: {
        ability: 'wis',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.Swim]: {
        ability: 'str',
        trainedOnly: false,
        armorCheckPenalty: false
    },
    [SkillKey.UseMagicDevice]: {
        ability: 'cha',
        trainedOnly: false,
        armorCheckPenalty: false
    }
} as const;

// Export types using the const enum
export type SkillMap = { [K in SkillKey]: SkillDefinition };
export type ClassSkillList = SkillKey[];
export { SkillKey };