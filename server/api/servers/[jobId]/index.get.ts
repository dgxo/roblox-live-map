// get server with jobId
export default defineEventHandler(async (event) => {
	const sampleServer = {
		_id: 'test',
		createdAt: 1,
		jobId: 'test',
		players: [
			{
				_id: 'test',
				userId: 361635687,
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
				_id: 'test',
				userId: 361635687,
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
				_id: 'test',
				userId: 361635687,
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
	};

	try {
		const server = await serverSchema.findOne({ jobId: event.context.params?.jobId });

		if (!server) {
			throw createError({
				statusMessage: 'Server not found',
				statusCode: 404,
			});
		}
	} catch (error) {
		return error;
	}
});
