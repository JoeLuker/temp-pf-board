<!-- src/lib/components/shared/inputs/ValueEditor.svelte -->
<script lang="ts">
	const props = $props<{
		value: number | string;
		onvalueChange: (value: number | string) => void;
		label?: string;
		min?: number;
		max?: number;
		type?: 'number' | 'text';
	}>();

	let {
		value,
		onvalueChange,
		label = undefined,
		min = undefined,
		max = undefined,
		type = 'number'
	} = props;

	const inputId = `value-editor-${Math.random().toString(36).slice(2)}`;
</script>

<div class="flex flex-col">
	{#if label}
		<label for={inputId} class="text-sm text-yellow-800 mb-1">{label}</label>
	{/if}
	<input
		{type}
		id={inputId}
		{min}
		{max}
		{value}
		oninput={(e) =>
			onvalueChange(type === 'number' ? +e.currentTarget.value : e.currentTarget.value)}
		class="input-control"
	/>
</div>
