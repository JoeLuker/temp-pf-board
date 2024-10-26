<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { characterStore } from '$lib/stores/core/character.svelte';
	import { getAbilityModifiers, getCombatStats } from '$lib/stores/derived/index.svelte';
	import {
		AbilityScores,
		CombatStats,
		FeatList,
		SpellBook,
		SkillList,
		EquipmentList,
		CharacterBasicInfo
	} from '$lib/components/character';
	import ResourceTracker from '$lib/components/shared/inputs/ResourceTracker.svelte';
	import { calculateMaxBombsPerDay } from '$lib/data/rules/game-rules';
	import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';
	import SectionHeader from '$lib/components/shared/layout/SectionHeader.svelte';
	import { useResource } from '$lib/stores/core/character.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	const combatStats = $derived(getCombatStats());
	const abilityModifiers = $derived(getAbilityModifiers());

	// Get derived values
	const maxBombs = $derived(calculateMaxBombsPerDay(characterStore.level, abilityModifiers.int));
	// Handle resource usage
	function handleBombUsage({ used }: { used: number }) {
		useResource('bombsUsed', used - characterStore.resources.bombsUsed);
	}

	let activeSection = $state('basic');
	const sections = ['basic', 'combat', 'skills', 'feats', 'spellbook', 'equipment'] as const;
	type Section = typeof sections[number];

	function setActiveSection(section: Section) {
		activeSection = section;
	}

	let navElement: HTMLElement;
	let showLeftIndicator = $state(false);
	let showRightIndicator = $state(false);
	let showNav = $state(true);
	let lastScrollY = $state(0);

	function checkScrollIndicators() {
		if (!navElement) return;
		
		const { scrollLeft, scrollWidth, clientWidth } = navElement;
		showLeftIndicator = scrollLeft > 0;
		showRightIndicator = scrollLeft < scrollWidth - clientWidth - 1;
	}

	function scrollLeft() {
		navElement.scrollBy({ left: -100, behavior: 'smooth' });
	}

	function scrollRight() {
		navElement.scrollBy({ left: 100, behavior: 'smooth' });
	}

	function handleScroll() {
		const currentScrollY = window.scrollY;
		showNav = currentScrollY < lastScrollY || currentScrollY < 50;
		lastScrollY = currentScrollY;
	}

	onMount(() => {
		const observer = new ResizeObserver(checkScrollIndicators);
		if (navElement) {
				observer.observe(navElement);
				checkScrollIndicators();
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<div
	class="min-h-screen bg-[url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98')] bg-cover bg-center pt-16"
>
	<!-- Navigation -->
	<div class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-yellow-900/80 backdrop-blur-sm"
		 class:translate-y-[-100%]={!showNav}>
		<div class="container mx-auto px-2 py-2">
			<div class="relative">
				{#if showLeftIndicator}
					<button class="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-900 text-yellow-100 p-1 rounded-r-md z-20"
							onclick={scrollLeft}>
						<ChevronLeft size={24} />
					</button>
				{/if}
				<nav class="overflow-x-auto scrollbar-hide"
					 bind:this={navElement}
					 onscroll={checkScrollIndicators}>
					<div class="flex space-x-1 p-1 rounded-lg w-fit mx-auto">
						{#each sections as section}
							<button
								class="px-4 py-2 rounded-md font-pirata text-lg transition-all duration-200 relative
									{activeSection === section 
										? 'text-yellow-900 bg-yellow-100/90 shadow-md' 
										: 'text-yellow-100/90 hover:bg-yellow-100/20'}"
								onclick={() => setActiveSection(section)}
							>
								{section.charAt(0).toUpperCase() + section.slice(1)}
								{#if activeSection === section}
									<div class="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-600"></div>
								{/if}
							</button>
						{/each}
					</div>
				</nav>
				{#if showRightIndicator}
					<button class="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-900 text-yellow-100 p-1 rounded-l-md z-20"
							onclick={scrollRight}>
						<ChevronRight size={24} />
					</button>
				{/if}
			</div>
		</div>
	</div>

	<div class="container mx-auto px-2 py-4">
		<!-- Content Area -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each sections as section}
				<div class="lg:block col-span-1 md:col-span-2 lg:col-span-3" class:hidden={activeSection !== section}>
					<div in:fade>
						{#if section === 'basic'}
							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								<div class="col-span-1 md:col-span-2 lg:col-span-3">
									<CharacterBasicInfo />
								</div>
								<div class="col-span-1">
									<ParchmentCell title="Combat Stats">
										<div class="flex justify-between text-sm">
											<div>HP: <span class="font-bold">{characterStore.baseHP}</span></div>
											<div>
												AC: <span class="font-bold">{combatStats.ac.total}</span>
												<span class="text-xs">({combatStats.ac.touch}/{combatStats.ac.flatFooted})</span>
											</div>
											<div>Init: <span class="font-bold">{abilityModifiers.dex >= 0 ? '+' : ''}{abilityModifiers.dex}</span></div>
										</div>
									</ParchmentCell>
								</div>
								<div class="col-span-1 md:col-span-2">
									<SectionHeader title="Abilities" id="abilities">
										<AbilityScores />
									</SectionHeader>
								</div>
							</div>
						{:else if section === 'combat'}
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="col-span-1 md:col-span-2">
									<SectionHeader title="Combat" id="combat">
										<CombatStats />
									</SectionHeader>
								</div>
								<div class="col-span-1">
									<ParchmentCell>
										<ResourceTracker
											label="Bombs"
											type="bombs"
											total={maxBombs}
											used={characterStore.resources.bombsUsed}
											onuse={handleBombUsage}
										/>
									</ParchmentCell>
								</div>
							</div>
						{:else if section === 'skills'}
							<SectionHeader title="Skills" id="skills">
								<SkillList />
							</SectionHeader>
						{:else if section === 'feats'}
							<SectionHeader title="Feats" id="feats">
								<FeatList />
							</SectionHeader>
						{:else if section === 'spellbook'}
							<SectionHeader title="Spellbook" id="spellbook">
								<SpellBook />
							</SectionHeader>
						{:else if section === 'equipment'}
							<SectionHeader title="Equipment" id="equipment">
								<EquipmentList />
							</SectionHeader>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
