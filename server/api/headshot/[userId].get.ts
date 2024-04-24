// api status

export default defineEventHandler(async (event) => {
	const userId = getRouterParam(event, 'userId');
	const size = getRouterParam(event, 'size') ?? 48;
	let response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=${size}x${size}&format=Png&isCircular=true`);
	const json = await response.json();

	if (json.errors) {
		throw createError({
			status: response.status,
			message: json.errors[0].message,
		});
	}

	if (json.data.length === 0) {
		throw createError({
			status: 404,
			message: 'User not found',
		});
	}

	const imageUrl = json.data[0]?.imageUrl;

	// send image contents
	response = await fetch(imageUrl);
	const imageBuffer = await response.arrayBuffer();
	event.headers.set('Content-Type', 'image/png');
	return Buffer.from(imageBuffer);
});
