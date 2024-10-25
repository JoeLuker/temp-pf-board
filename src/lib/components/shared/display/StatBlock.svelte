<!-- src/lib/components/shared/display/StatBlock.svelte -->
<script lang="ts">
    import type { StatBlockProps } from '../types';
    import ModifierPill from '../inputs/ModifierPill.svelte';
    
    interface Props {
        label: string;
        value: number | string;
        modifier?: number | undefined;
        description?: string | undefined;
    }

    let {
        label,
        value,
        modifier = undefined,
        description = undefined
    }: Props = $props();
</script>

<div class="stat-block">
    <div class="stat-label">{label}</div>
    <div class="stat-value">{value}</div>
    {#if modifier !== undefined}
        <ModifierPill value={modifier} label="Modifier" />
    {/if}
    {#if description}
        <div class="stat-description">{description}</div>
    {/if}
</div>

<style>
    .stat-block {
        @apply p-3 bg-yellow-50/95 rounded-lg shadow-md border border-yellow-200/50;
    }
    .stat-label {
        @apply text-sm font-bold text-yellow-800;
    }
    .stat-value {
        @apply text-2xl font-pirata text-yellow-900;
    }
    .stat-description {
        @apply text-xs text-yellow-600 mt-1;
    }
</style>
