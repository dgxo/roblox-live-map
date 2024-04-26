<script setup lang="ts">
const players = ref([
	{
		id: 1,
		displayName: 'Dog',
		username: 'MrTortoise_guy',
	},
]);

const route = useRoute();
const { data: server, pending, error } = await useFetch(() => `/api/servers/${route.params.jobId}/`);

if (!error) onMounted(() => setInterval(refreshNuxtData, 5000));

useHead({
	title: `${players.value.length} Player Server | Roblox Live`,
	meta: [{ name: 'description', content: `Roblox Live Map - ${players.value.length} player server` }],
});
</script>

<template>
	<div class="flex flex-col sm:flex-row p-4 gap-4 bg-gray-950 h-screen w-full text-white">
		<div id="map" class="flex-grow rounded-xl bg-gray-900 overflow-clip">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
						<path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5" />
					</pattern>
					<pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
						<rect width="100" height="100" fill="url(#smallGrid)" />
						<path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1" />
					</pattern>
				</defs>

				<rect width="100%" height="100%" rx="12" fill="url(#smallGrid)" />
			</svg>
		</div>
		<aside class="flex flex-col items-end rounded-xl gap-4 self-stretch overflow-y-auto text-xl">
			<section class="flex p-6 flex-col items-start gap-4 self-stretch rounded-xl bg-gray-900">
				<h2 class="text-3xl font-bold">Status</h2>

				<div id="status-indicator" v-if="pending" class="flex gap-2 font-medium items-center text-orange-400">
					<svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
						<circle r="8" cx="8" cy="8" fill="currentColor" />
					</svg>
					<span id="status">Connecting...</span>
				</div>
				<div id="status-indicator" v-else-if="error" class="flex gap-2 font-medium items-center text-red-400">
					<svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
						<circle r="8" cx="8" cy="8" fill="currentColor" />
					</svg>
					<span id="status" class="flex flex-col gap-1">
						An error occurred:
						<pre class="rounded-md border border-gray-700 bg-gray-800 p-2 max-w-64 text-wrap">{{ error.data.message }}</pre>
					</span>
				</div>
				<div id="status-indicator" v-else class="flex gap-2 font-medium items-center text-green-400">
					<svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
						<circle r="8" cx="8" cy="8" fill="currentColor" />
					</svg>
					<span id="status">Connected</span>
				</div>

				<table id="stats-table">
					<tr>
						<td>Players</td>
						<td id="players" class="pl-4 mw-4">...</td>
					</tr>
					<tr>
						<td>Viewers</td>
						<td id="viewers" class="pl-4 mw-4">...</td>
					</tr>
					<tr>
						<td>Average Ping</td>
						<td id="average-ping" class="pl-4 mw-4">...</td>
					</tr>
					<tr>
						<td>Server FPS</td>
						<td id="server-fps" class="pl-4 mw-4">...</td>
					</tr>
					<tr>
						<td>Server Location</td>
						<td id="server-location" class="pl-4 mw-4">...</td>
					</tr>
				</table>
			</section>
			<section class="flex p-6 flex-col items-start gap-4 self-stretch rounded-xl bg-gray-900">
				<h2 class="text-3xl font-bold">Status</h2>

				<ul class="list-none flex flex-col gap-2 overflow-y-auto overflow-x-clip scroll-m-4 max-h-72">
					<li class="flex items-center gap-2 font-medium" v-bind:id="`player-${player.userId}`" v-for="player in server?.players">
						<img :src="`/api/headshot/${player.userId}`" alt="Player Headshot" class="size-8 rounded-full bg-gray-400 object-cover" />
						<span id="player-display-name">{{ player.displayName }}</span>
						<span v-if="player.username !== player.displayName" id="player-username" class="text-gray-500 text-lg">({{ player.username }})</span>
					</li>
				</ul>
			</section>
			<div class="flex gap-2">
				<UButton icon="i-material-symbols-arrow-back" to="/" size="md" variant="outline" color="white">Back to Servers</UButton>
			</div>
		</aside>
	</div>
</template>
