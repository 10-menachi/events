<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { initializeAuth, isLoading, isLoggedIn, login, user } from '../stores/auth';
	import { get } from 'svelte/store';

	let { children } = $props();

	onMount(async () => {
		isLoading.set(true);

		await initializeAuth();

		const isCallbackRoute =
			window.location.pathname === '/auth/callback' || window.location.search.includes('code=');
		const authenticated = get(isLoggedIn);
		const hasUser = Boolean(get(user));

		if (!authenticated && !hasUser && !isCallbackRoute) {
			await login();
		}

		isLoading.set(false);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
