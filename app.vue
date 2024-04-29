<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
</script>

<template>
	<div class="font-['DM Sans'] bg-gray-950">
		<NuxtPage />
		<SpeedInsights />
	</div>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(4px);
}
</style>
