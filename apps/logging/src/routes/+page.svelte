<script lang="ts">
	import { isLoading, user } from '../stores/auth';
	import Loading from '../components/Loading.svelte';
	import LogsView from '../components/LogsView.svelte';
</script>

{#if $isLoading}
	<Loading />
{:else if $user}
	<LogsView />
{:else}
	<p>No user loaded yet.</p>
{/if}
