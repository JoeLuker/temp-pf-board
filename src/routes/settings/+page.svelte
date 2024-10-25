<!-- src/routes/settings/+page.svelte -->
<script lang="ts">
    import { state } from 'svelte';
    import { persistStore } from '$lib/stores/persistence';
    
    const settingsState = persistStore('settings', {
        theme: 'light',
        autoSave: true,
        notifications: true
    });
</script>

<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Settings</h1>
    <div class="parchment-cell">
        <!-- Settings content will go here -->
        <p class="text-yellow-800">Settings page under construction</p>
    </div>
</div>
