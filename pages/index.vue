<script lang="ts" setup>
useHead({
	title: 'Servers | Roblox Live',
});

interface Server {
	jobId: string;
	created: Number; // epoch seconds
	players: Player[];
	stats: {
		viewers: Number;
		averagePing: Number;
		serverFps: Number;
		location: String;
	};
}

interface Player {
	userId: string;
	username: string;
	rank: string;
	displayName: string;
	data: {
		position: {
			x: Number;
			y: Number;
			z: Number;
		};
		rotation: {
			y: Number;
		};
	};
}

let servers: Ref<Server[]> = ref([
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
	{
		jobId: 'test',
		created: 1,
		players: [
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
			{
				userId: '361635687',
				username: 'MrTortoise_guy',
				rank: 'Owner',
				displayName: 'Dog',
				data: {
					position: {
						x: 0,
						y: 0,
						z: 0,
					},
					rotation: {
						y: 0,
					},
				},
			},
		],
		stats: {
			viewers: 0,
			averagePing: 0,
			serverFps: 0,
			location: 'England',
		},
	},
]);

servers.value[0].players.push(...servers.value[0].players, ...servers.value[0].players, ...servers.value[0].players, ...servers.value[0].players);
</script>

<template>
	<div class="flex p-8 gap-4 flex-col bg-gray-950 h-screen w-full text-white">
		<h1 class="text-5xl font-bold">Roblox Live</h1>
		<p class="text-lg text-gray-400">Select a server</p>

		<ul class="list-none flex flex-row gap-4 flex-wrap">
			<li v-for="server in servers" :key="server.jobId">
				<NuxtLink :to="`/server/${server.jobId}`" class="flex gap-2 p-4 font-medium bg-slate-900 rounded-lg flex-col w-fit">
					<UAvatarGroup size="md" :max="10">
						<UTooltip
							class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-10 w-10 text-base"
							v-for="player in server.players"
							:text="`${player?.displayName} ${player?.username !== player?.username ? `(${player?.username})` : ''}`"
							:popper="{ placement: 'top' }">
							<UAvatar :src="`/api/headshot/${player?.userId}`" size="md" :alt="player?.username" />
						</UTooltip>
					</UAvatarGroup>
					<span class="text-2xl">
						{{ server.players.length }} <span class="text-gray-400">player{{ server.players.length === 1 ? '' : 's' }}</span>
					</span>
					<span class="text-md text-gray-500">{{ server.jobId }}</span>
				</NuxtLink>
			</li>
		</ul>
		<div class="absolute bottom-8 right-8 text-gray-600">© {{ new Date().getFullYear() }} Englon Ltd.</div>
	</div>
</template>
