<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { handleCallback } from '../../../stores/auth';
	import Loading from '../../../components/Loading.svelte';

	onMount(async () => {
		try {
			await handleCallback();

			await goto('/');
		} catch (err) {
			console.error('CALLBACK ERROR:', err);
		}
	});
</script>

<Loading />
