// src/lib/types/skills.ts (new file)
export interface SkillDefinition {
    ability: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
    trainedOnly: boolean;
    armorCheckPenalty: boolean;
}

export type SkillMap = Record<string, SkillDefinition>;
export type ClassSkillList = string[];
export type SkillKey = keyof typeof SKILL_DEFINITIONS;
