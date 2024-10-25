<!-- src/lib/components/shared/inputs/ValueEditor.svelte -->
<script lang="ts">
    import type { ValueEditorProps } from '../types';
    
    interface Props {
        value: number | string;
        onChange: (value: number | string) => void;
        label?: string | undefined;
        min?: number | undefined;
        max?: number | undefined;
        type?: 'number' | 'text';
    }

    let {
        value,
        onChange,
        label = undefined,
        min = undefined,
        max = undefined,
        type = 'number'
    }: Props = $props();
</script>

<div class="flex flex-col">
    {#if label}
        <label class="text-sm text-yellow-800 mb-1">{label}</label>
    {/if}
    <input
        {type}
        {min}
        {max}
        value={value}
        oninput={(e) => onChange(type === 'number' ? +e.currentTarget.value : e.currentTarget.value)}
        class="input-control"
    />
</div>
