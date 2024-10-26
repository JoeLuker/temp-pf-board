<!-- src/lib/components/shared/layout/SectionHeader.svelte -->
<script lang="ts">
	interface Props {
		title: string;
		id: string;
		children?: import('svelte').Snippet;
	}

	let { title, id, children }: Props = $props();
</script>

<section {id}>
	<h2 class="text-[#c19a6b] text-2xl border-b-2 border-[#c19a6b] pb-2 mb-4">
		{title}
	</h2>
	{@render children?.()}
</section>
