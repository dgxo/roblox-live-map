<script lang="ts" setup>
useHead({
	title: 'Servers | Roblox Live',
	meta: [
		{
			name: 'description',
			content: 'Live Roblox map - see players and trains in real time.',
		},
	],
});

// sample data

const { data: servers, pending, error } = await useFetch(() => '/api/servers/');

onMounted(() => setInterval(refreshNuxtData, 5000));

// servers.value[0].players = [...servers.value[0].players, ...servers.value[0].players, ...servers.value[0].players, ...servers.value[0].players];
</script>

<template>
	<div class="flex h-screen w-full flex-col gap-4 p-8 text-white">
		<h1 class="text-5xl font-bold">Roblox Live</h1>
		<p class="text-lg text-gray-400">Select a server</p>

		<ul class="flex list-none flex-row flex-wrap gap-4">
			<li v-for="server in servers" :key="server.jobId">
				<NuxtLink
					:to="`/server/${server.jobId}`"
					class="flex w-fit flex-col gap-2 rounded-lg bg-slate-900 p-4 font-medium"
				>
					<UAvatarGroup size="md" :max="10">
						<UTooltip
							class="relative inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base"
							v-for="player in server.players"
							:text="`${player?.displayName} ${player?.username !== player?.displayName ? `(${player?.username})` : ''}`"
							:popper="{ placement: 'top' }"
						>
							<UAvatar :src="`/api/headshot/${player?.userId}`" size="md" :alt="player?.username" />
						</UTooltip>
					</UAvatarGroup>
					<span class="text-2xl" v-if="server.players?.length > 0">
						{{ server.players?.length }}
						<span class="text-gray-400">player{{ server.players?.length === 1 ? '' : 's' }}</span>
					</span>
					<pre class="text-xl text-red-300" v-if="!server.jobId">Failed to load server</pre>
					<span class="text-base text-gray-500">{{ server.jobId }}</span>
				</NuxtLink>
			</li>
		</ul>
		<p class="text-md text-gray-300" v-if="!servers">No servers are online.</p>
		<pre class="text-md text-red-300" v-else-if="error">Could not load servers: {{ error.data }}</pre>
		<p
			:class="`text-md text-gray-400 transition-opacity delay-100 duration-300 ${pending ? 'opacity-100' : 'opacity-0'}`"
		>
			<UIcon name="i-material-symbols-autorenew" class="animate-spin" />
			Updating...
		</p>
		<div class="absolute bottom-8 right-8 text-gray-600">&copy; {{ new Date().getFullYear() }} Englon Ltd.</div>
	</div>
</template>
