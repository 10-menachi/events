<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeAuth, isAuthenticated, isLoading, isLoggedIn, login } from '../stores/auth';
	import Loading from '../components/Loading.svelte';
	import { get } from 'svelte/store';

	let { children } = $props();

	onMount(async () => {
		await initializeAuth();

		console.log('LOGUDIN', get(isLoggedIn));

		if (!get(isLoggedIn)) {
			await login();
		}
	});
</script>

<svelte:head>
	<title>Logging Dashboard</title>
</svelte:head>

{#if $isLoading}
	<Loading />
{:else}
	{@render children()}
{/if}
