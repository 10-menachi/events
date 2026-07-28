<script lang="ts">
	import Progress from '../components/progress.svelte';
	import LogsView from '../components/logs-view.svelte';
	import { isLoading } from '../stores/auth';
</script>

{#if isLoading}
	<Progress />
{/if}

<LogsView />
