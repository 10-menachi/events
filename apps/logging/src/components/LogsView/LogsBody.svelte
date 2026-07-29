<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Info from './Levels/Info.svelte';
	import Warn from './Levels/Warn.svelte';
	import Error from './Levels/Error.svelte';
	import Fatal from './Levels/Fatal.svelte';
</script>

<Tabs class="flex h-full w-full flex-col gap-4" defaultValue="info">
	<Tabs.List class="flex flex-wrap gap-2">
		<Tabs.Trigger value="info" class="min-w-24">INFO</Tabs.Trigger>
		<Tabs.Trigger value="warn" class="min-w-24">WARN</Tabs.Trigger>
		<Tabs.Trigger value="error" class="min-w-24">ERROR</Tabs.Trigger>
		<Tabs.Trigger value="fatal" class="min-w-24">FATAL</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>

	<Tabs.Content
		value="info"
		class="flex-1 rounded-container border border-surface-300-700 bg-surface-100-900/60 p-4"
	>
		<Info />
	</Tabs.Content>

	<Tabs.Content
		value="warn"
		class="flex-1 rounded-container border border-surface-300-700 bg-surface-100-900/60 p-4"
	>
		<Warn />
	</Tabs.Content>

	<Tabs.Content
		value="error"
		class="flex-1 rounded-container border border-surface-300-700 bg-surface-100-900/60 p-4"
	>
		<Error />
	</Tabs.Content>

	<Tabs.Content
		value="fatal"
		class="flex-1 rounded-container border border-surface-300-700 bg-surface-100-900/60 p-4"
	>
		<Fatal />
	</Tabs.Content>
</Tabs>
