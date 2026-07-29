<script lang="ts">
	const { size = 40, thickness = 4, color = '#3b82f6' } = $props();
</script>

<div class="loading-container" aria-label="Loading" role="status">
	<div
		class="spinner"
		style="
			--size: {size}px;
			--thickness: {thickness}px;
			--color: {color};
		"
	></div>
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		width: 100%;
	}

	.spinner {
		width: var(--size);
		height: var(--size);
		border: var(--thickness) solid rgba(255, 255, 255, 0.15);
		border-top-color: var(--color);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
