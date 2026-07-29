<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initializeAuth, isLoading } from '../stores/auth';
	import Loading from '../components/Loading.svelte';

	let { children } = $props();

	onMount(async () => {
		try {
			await initializeAuth();
		} catch (error) {
			console.error('Auth initialization failed:', error);
		} finally {
			isLoading.set(false);
		}
	});
</script>

<svelte:head>
	<title>Logs Visualizer</title>
</svelte:head>

{#if $isLoading}
	<Loading />
{:else}
	{@render children()}
{/if}
