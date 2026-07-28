<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { initializeAuth, isLoading } from '../../../stores/auth';
	import Progress from '../../../components/progress.svelte';

	onMount(async () => {
		isLoading.set(true);

		try {
			await initializeAuth();
			await goto('/');
		} catch (error) {
			console.error('Callback handling failed:', error);
			await goto('/');
		} finally {
			isLoading.set(false);
		}
	});
</script>

<Progress />
