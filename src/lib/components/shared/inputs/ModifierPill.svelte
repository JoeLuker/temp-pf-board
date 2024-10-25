<!-- src/lib/components/shared/inputs/ModifierPill.svelte -->
<script lang="ts">
    import type { ModifierPillProps } from '../types';
    
    interface Props {
        value: number;
        label?: string | undefined;
        className?: string | undefined;
    }

    let { value, label = undefined, className = undefined }: Props = $props();
</script>

<div class={`modifier-pill ${value >= 0 ? 'positive' : 'negative'} ${className || ''}`}>
    {#if label}
        <span class="mr-1">{label}</span>
    {/if}
    <span>{value >= 0 ? '+' : ''}{value}</span>
</div>

<style>
    .modifier-pill {
        @apply inline-flex items-center px-2 py-1 rounded-full text-sm font-medium;
    }
    .modifier-pill.positive {
        @apply bg-green-100 text-green-800;
    }
    .modifier-pill.negative {
        @apply bg-red-100 text-red-800;
    }
</style>
