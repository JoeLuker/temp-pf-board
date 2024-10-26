<!-- src/lib/components/shared/layout/ParchmentCell.svelte -->
<script lang="ts">
	interface Props {
		title?: string | undefined;
		padding?: boolean;
		className?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title = undefined,
		padding = true,
		className = '',
		children
	}: Props = $props();

	let containerClasses = $derived(
		`
      relative
      bg-yellow-50/95 
      rounded-lg 
      shadow-md 
      backdrop-blur-sm
      border
      border-yellow-200/50
      transition-all
      duration-200
      hover:shadow-lg
      ${padding ? 'p-2 sm:p-4' : ''}
      ${className}
  `.trim()
	);

	let contentClasses = $derived(
		`
      transition-all 
      duration-200 
      ease-in-out
      h-auto opacity-100
  `.trim()
	);
</script>

<div class={containerClasses} data-testid="parchment-cell">
	<!-- {#if title}
		<h3 class="text-lg sm:text-xl font-pirata text-yellow-900 mb-2 sm:mb-4">{title}</h3>
	{/if} -->

	<div class={contentClasses}>
		{@render children?.()}
	</div>
</div>

<style>
	[data-testid='parchment-cell']::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEX////d3d3u7u7////////////////////////////////KSvELAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAQElEQVQ4je2RsQ0AIAzD3P8/OhvQIYUFGniwlMh3yneC4Ey4sjTxOklI8Xp0xKdYw5GFgYWBhYGFgYWBhYFFg4UBnxUCmm3eawIAAAAASUVORK5CYII=');
		opacity: 0.05;
		border-radius: 0.5rem;
		pointer-events: none;
	}
</style>
