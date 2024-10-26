<script lang="ts">
	import { getCombatStats } from '$lib/stores/derived/index.svelte';
	import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';

	const combatStats = $derived(getCombatStats());
</script>

<div class="space-y-4">
	<ParchmentCell title="Combat Statistics">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<!-- AC Section -->
			<div class="bg-yellow-100/50 rounded-lg p-3 border border-yellow-200">
				<div class="stat-label">Armor Class</div>
				<div class="stat-value">{combatStats.ac.total}</div>
				<div class="flex space-x-4 mt-1 text-sm text-yellow-700">
					<span>Touch: {combatStats.ac.touch}</span>
					<span>FF: {combatStats.ac.flatFooted}</span>
				</div>
			</div>

			<!-- BAB Section -->
			<div class="bg-yellow-100/50 rounded-lg p-3 border border-yellow-200">
				<div class="stat-label">Base Attack</div>
				<div class="stat-value">+{combatStats.attacks.bab}</div>
			</div>

			<!-- CMD/CMB Section -->
			<div class="bg-yellow-100/50 rounded-lg p-3 border border-yellow-200">
				<div class="stat-label">Combat Maneuvers</div>
				<div class="flex justify-between">
					<div>
						<span class="text-sm text-yellow-700">CMD</span>
						<div class="stat-value">{combatStats.attacks.cmd}</div>
					</div>
					<div>
						<span class="text-sm text-yellow-700">CMB</span>
						<div class="stat-value">+{combatStats.attacks.cmb}</div>
					</div>
				</div>
			</div>
		</div>
	</ParchmentCell>
</div>
