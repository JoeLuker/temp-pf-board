<!-- src/lib/components/shared/layout/ParchmentCell.svelte -->
<script lang="ts">
  let isCollapsed = $state(false);
  interface Props {
    title?: string | undefined;
    collapsible?: boolean;
    padding?: boolean;
    className?: string;
    children?: import('svelte').Snippet;
  }

  let {
    title = undefined,
    collapsible = false,
    padding = true,
    className = '',
    children
  }: Props = $props();

  function toggleCollapse() {
      if (collapsible) {
          isCollapsed = !isCollapsed;
      }
  }

  let containerClasses = $derived(`
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
      ${padding ? 'p-4' : ''}
      ${className}
  `.trim());

  let contentClasses = $derived(`
      transition-all 
      duration-200 
      ease-in-out
      ${isCollapsed ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}
  `.trim());
</script>

{#if collapsible}
  <div 
      class={containerClasses}
      data-testid="parchment-cell"
  >
      <div class="contents">
          {#if title}
              <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl font-pirata text-yellow-900">{title}</h3>
                  <span 
                      class="text-yellow-700 hover:text-yellow-900 transition-colors cursor-pointer"
                      onclick={toggleCollapse}
                      aria-expanded={!isCollapsed}
                  >
                      <svg
                          class={`w-6 h-6 transform transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                          <path 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
                              stroke-width="2" 
                              d="M19 9l-7 7-7-7"
                          />
                      </svg>
                  </span>
              </div>
          {/if}

          <div class={contentClasses}>
              {@render children?.()}
          </div>
      </div>
  </div>
{:else}
  <div 
      class={containerClasses}
      data-testid="parchment-cell"
  >
      {#if title}
          <h3 class="text-xl font-pirata text-yellow-900 mb-4">{title}</h3>
      {/if}

      <div class={contentClasses}>
          {@render children?.()}
      </div>
  </div>
{/if}

<style>
  [data-testid="parchment-cell"]::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEX////d3d3u7u7////////////////////////////////KSvELAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAQElEQVQ4je2RsQ0AIAzD3P8/OhvQIYUFGniwlMh3yneC4Ey4sjTxOklI8Xp0xKdYw5GFgYWBhYGFgYWBhYFFg4UBnxUCmm3eawIAAAAASUVORK5CYII=");
      opacity: 0.05;
      border-radius: 0.5rem;
      pointer-events: none;
  }
</style>
