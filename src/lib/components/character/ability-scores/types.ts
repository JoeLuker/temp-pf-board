// src/lib/components/character/ability-scores/types.ts
export interface AbilityScoreProps {
	ability: string;
	score: number;
	modifier: number;
	onScoreChange: (newScore: number) => void;
}
