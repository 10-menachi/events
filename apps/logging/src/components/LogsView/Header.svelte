<script lang="ts">
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton-svelte';
	import { user } from '../../stores/auth';
	import { get } from 'svelte/store';

	const src = get(user)?.picture;
	let isOpen = $state(false);

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<div class="relative">
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[1fr_2fr_1fr]">
			<AppBar.Lead>
				<button
					type="button"
					class="btn-icon btn-icon-lg hover:preset-tonal"
					onclick={toggleSidebar}
					aria-expanded={isOpen}
					aria-controls="logs-sidebar"
				>
					{#if isOpen}
						<XIcon />
					{:else}
						<MenuIcon />
					{/if}
				</button>
			</AppBar.Lead>
			<AppBar.Headline class="flex justify-center">
				<p>Logs Visualizer</p>
			</AppBar.Headline>
			<AppBar.Trail class="justify-end">
				<Avatar class="size-10">
					<Avatar.Image {src} alt="User Avatar" />
					<Avatar.Fallback>SK</Avatar.Fallback>
				</Avatar>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<button
		type="button"
		class={`sidebar-backdrop ${isOpen ? 'visible' : ''}`}
		onclick={toggleSidebar}
		onkeydown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				toggleSidebar();
			}
		}}
		aria-label="Close sidebar"
	></button>

	<aside id="logs-sidebar" class={`sidebar ${isOpen ? 'open' : ''}`}>
		<div class="p-4 space-y-4">
			<p class="font-semibold">Navigation</p>
			<ul class="space-y-2">
				<li><a href="" class="block rounded-token px-3 py-2 hover:preset-tonal">Auth Logs</a></li>
				<li><a href="" class="block rounded-token px-3 py-2 hover:preset-tonal">Events Logs</a></li>
			</ul>
		</div>
	</aside>
</div>

<style>
	.sidebar-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.25);
		opacity: 0;
		pointer-events: none;
		transition: opacity 180ms ease;
		z-index: 40;
	}

	.sidebar-backdrop.visible {
		opacity: 1;
		pointer-events: auto;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: min(280px, 80vw);
		background: var(--color-surface-900, #111827);
		color: var(--color-surface-50, #f9fafb);
		transform: translateX(-100%);
		transition: transform 180ms ease;
		z-index: 50;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.sidebar.open {
		transform: translateX(0);
	}
</style>
