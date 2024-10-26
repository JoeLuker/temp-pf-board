<script lang="ts">
	import { characterStore, addSkill, removeSkill } from '$lib/stores/core/character.svelte';
	import { getAbilityModifiers } from '$lib/stores/derived/index.svelte';
	import {
		skillList,
		alchemistClassSkills,
		SKILL_TO_ABILITY_MAP,
		SkillKey
	} from '$lib/data/rules/skills.svelte';
	import { calculateSkillModifier } from '$lib/data/rules/game-rules';
	import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
	import type { Skill, Abilities } from '$lib/types/character';

	let newSkillName = $state<SkillKey | ''>('');
	let newSkillRanks = $state(0);
	let availableSkills = $state<SkillKey[]>([]);
	let maxRanks = $state(0);

	const abilityModifiers = $derived(getAbilityModifiers());

	$effect(() => {
		availableSkills = skillList.filter(
			(skill) => !characterStore.skills.some((s) => s.name === skill)
		);
	});

	$effect(() => {
		maxRanks = characterStore.level;
	});

	function addNewSkill() {
		if (newSkillName && newSkillRanks > 0) {
			const isClassSkill = alchemistClassSkills.includes(newSkillName);
			addSkill({
				name: newSkillName,
				ranks: newSkillRanks,
				isClassSkill
			});
			newSkillName = '';
			newSkillRanks = 0;
		}
	}

	function handleOnAddSkill(event: Event) {
		event.preventDefault();
		addNewSkill();
	}

	function updateSkillRanks(skill: Skill, newRanks: number) {
		if (newRanks <= 0) {
			removeSkill(skill.name);
		} else {
			addSkill({
				...skill,
				ranks: newRanks
			});
		}
	}

	function getAbilityModForSkill(skillName: SkillKey): number {
		const ability = SKILL_TO_ABILITY_MAP[skillName];
		return abilityModifiers[ability] || 0;
	}

	function formatSkillName(skill: SkillKey): string {
		return skill
			.replace('.', ' ')
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function getAbilityColor(
		skillName: SkillKey,
		variant: 'default' | 'light' | 'dark' = 'default'
	): string {
		const ability = SKILL_TO_ABILITY_MAP[skillName] as keyof Abilities;

		const baseColors = {
			str: 'red',
			dex: 'green',
			con: 'orange',
			int: 'blue',
			wis: 'purple',
			cha: 'pink'
		};

		const baseColor = baseColors[ability] || 'yellow';
		const opacity = variant === 'light' ? '50' : variant === 'dark' ? '200' : '100';

		const colorClass = `bg-${baseColor}-${opacity}`;
		return colorClass;
	}

	function getSkillRowClass(index: number, skillName: SkillKey): string {
		const isEven = index % 2 === 0;
		const abilityColor = getAbilityColor(skillName, isEven ? 'light' : 'dark');
		return `${abilityColor} p-2 rounded-md`;
	}
</script>

<div class="space-y-2">
	{#each characterStore.skills as skill, index (skill.name)}
		<ParchmentCell
			padding={false}
			className={getAbilityColor(skill.name as SkillKey, index % 2 === 0 ? 'light' : 'dark')}
		>
			<div class="p-2">
				<div class="flex items-center justify-between">
					<div class="flex-1">
						<h4 class="font-pirata text-base text-yellow-900">
							{formatSkillName(skill.name as SkillKey)}
						</h4>
						<div class="flex flex-wrap gap-2 items-center mt-1">
							<div class="flex items-center gap-1">
								<span class="text-xs text-yellow-700">Ranks:</span>
								<input
									type="number"
									value={skill.ranks}
									min="0"
									max={maxRanks}
									class="w-12 p-1 text-sm rounded border border-yellow-200 bg-yellow-50"
									onchange={(e) => updateSkillRanks(skill, parseInt(e.currentTarget.value))}
								/>
							</div>
							{#if skill.isClassSkill}
								<span class="bg-yellow-200 text-yellow-800 text-xs px-1.5 py-0.5 rounded">CS</span>
							{/if}
						</div>
					</div>
					<div class="text-lg font-bold text-yellow-900 ml-2">
						{#if calculateSkillModifier(skill.ranks, getAbilityModForSkill(skill.name as SkillKey), skill.isClassSkill) >= 0}+{/if}
						{calculateSkillModifier(
							skill.ranks,
							getAbilityModForSkill(skill.name as SkillKey),
							skill.isClassSkill
						)}
					</div>
				</div>
			</div>
		</ParchmentCell>
	{/each}

	<ParchmentCell padding={false}>
		<form onsubmit={handleOnAddSkill} class="p-2">
			<div class="flex flex-col sm:flex-row gap-2">
				<select
					bind:value={newSkillName}
					class="flex-1 p-1.5 text-sm rounded border border-yellow-200 bg-yellow-50"
				>
					<option value="">Select a skill</option>
					{#each availableSkills as skill}
						<option value={skill}>{formatSkillName(skill)}</option>
					{/each}
				</select>

				<div class="flex gap-2">
					<input
						type="number"
						bind:value={newSkillRanks}
						min="0"
						max={maxRanks}
						placeholder="Ranks"
						class="w-20 p-1.5 text-sm rounded border border-yellow-200 bg-yellow-50"
					/>

					<button
						type="submit"
						class="px-3 py-1.5 bg-yellow-700 text-yellow-50 text-sm rounded hover:bg-yellow-600 transition-colors"
						disabled={!newSkillName || newSkillRanks <= 0}
					>
						Add
					</button>
				</div>
			</div>
		</form>
	</ParchmentCell>
</div>

<style>
	:root {
		--color-red: 254 226 226;
		--color-green: 220 252 231;
		--color-orange: 254 235 200;
		--color-blue: 219 234 254;
		--color-purple: 237 233 254;
		--color-pink: 252 231 243;
		--color-yellow: 254 249 195;
	}
</style>
