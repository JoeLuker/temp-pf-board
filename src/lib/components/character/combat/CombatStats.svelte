<script lang="ts">
	import { getCombatStats } from '$lib/stores/derived/index.svelte';
	import ParchmentCell from '$lib/components/shared/layout/ParchmentCell.svelte';

	const combatStats = $derived(getCombatStats());
</script>

<div class="space-y-4">
	<ParchmentCell title="Combat Statistics">
		<div class="flex flex-wrap gap-2">
			<div class="flex-1 min-w-[120px] bg-yellow-100/50 rounded-lg p-2 border border-yellow-200">
				<div class="stat-label">AC</div>
				<div class="stat-value">{combatStats.ac.total}</div>
				<div class="flex gap-2 text-xs text-yellow-700">
					<span>T: {combatStats.ac.touch}</span>
					<span>FF: {combatStats.ac.flatFooted}</span>
				</div>
			</div>

			<div class="flex-1 min-w-[120px] bg-yellow-100/50 rounded-lg p-2 border border-yellow-200">
				<div class="stat-label">BAB</div>
				<div class="stat-value">+{combatStats.attacks.bab}</div>
			</div>

			<div class="flex-1 min-w-[120px] bg-yellow-100/50 rounded-lg p-2 border border-yellow-200">
				<div class="flex justify-between gap-4">
					<div>
						<div class="stat-label">CMD</div>
						<div class="stat-value">{combatStats.attacks.cmd}</div>
					</div>
					<div>
						<div class="stat-label">CMB</div>
						<div class="stat-value">+{combatStats.attacks.cmb}</div>
					</div>
				</div>
			</div>
		</div>
	</ParchmentCell>
</div>
