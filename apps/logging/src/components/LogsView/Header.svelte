<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton-svelte';
	import { user } from '../../stores/auth';
	import { get } from 'svelte/store';

	const src = get(user)?.picture;
</script>

<div class="relative">
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[1fr_2fr_1fr]">
			<AppBar.Lead></AppBar.Lead>
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
</div>
