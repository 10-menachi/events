<script lang="ts">
	import BikeIcon from '@lucide/svelte/icons/bike';
	import BookIcon from '@lucide/svelte/icons/book';
	import HouseIcon from '@lucide/svelte/icons/house';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import TreePalmIcon from '@lucide/svelte/icons/tree-palm';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import LogsBody from './LogsBody.svelte';

	const links = [
		{ label: 'Home', href: '/#', icon: HouseIcon },
		{ label: 'Entertainment', href: '/#', icon: BookIcon },
		{ label: 'Recreation', href: '/#', icon: BikeIcon },
		{ label: 'Relaxation', href: '/#', icon: TreePalmIcon }
	];
</script>

<div
	class="w-full min-h-[640px] grid grid-cols-[auto_1fr] overflow-hidden rounded-container border border-surface-200-800 bg-surface-50-950"
>
	<Navigation layout="rail" class="h-full border-r border-surface-200-800">
		<Navigation.Content>
			<Navigation.Menu>
				{#each links as link (link)}
					{@const Icon = link.icon}
					<Navigation.TriggerAnchor href={link.href}>
						<Icon class="size-5" />
						<Navigation.TriggerText>{link.label}</Navigation.TriggerText>
					</Navigation.TriggerAnchor>
				{/each}
			</Navigation.Menu>
		</Navigation.Content>
		<Navigation.Footer>
			<Navigation.TriggerAnchor href="/#" title="Settings" aria-label="Settings">
				<SettingsIcon class="size-5" />
			</Navigation.TriggerAnchor>
		</Navigation.Footer>
	</Navigation>

	<div class="flex min-h-0 flex-1 flex-col p-4">
		<LogsBody />
	</div>
</div>
