'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);

const PRIVATE_KEY = process.env.PRIVATE_KEY;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

const servers: Server[] = [];
const connections: WebSocket[] = [];

// authorisation
app.use(function (req: any, res: any, next: any) {
	// if (!req.headers.authorization) {
	// 	return res.status(403).json({ error: 'No credentials sent' });
	// }

	// if (req.headers.authorization !== `Bearer ${PRIVATE_KEY}`) {
	// 	return res.status(403).json({ error: 'Invalid credentials' });
	// }

	// if (req.headers.referrer.includes('https://roblox-live.dgox.uk/') || req.headers.referrer.includes('localhost')) {
	// 	return res.status(403).json({ error: 'Invalid Referrer' });
	// }
	// console.log(`${req.method} request to ${req.url} with user agent ${req.headers['user-agent']}`);

	next();
});

app.get('/api/', function (req: any, res: any) {
	res.send(200);
});

// create server
// req body: {created, stats: {players, viewers, averagePing, serverFps, position}}
app.post('/api/servers/:jobId', function (req: any, res: any) {
	const body = req.body;
	const jobId = req.params.jobId;

	if (servers.find((server) => server.jobId === jobId)) {
		res.status(409).send('Server already exists');
		return;
	}

	console.log(`New server created: ${jobId}`);
	servers.push({
		jobId,
		created: body.created,
		players: [],
		stats: {
			viewers: 0,
			averagePing: body.stats.averagePing,
			serverFps: body.stats.serverFps,
			location: body.stats.location,
		},
	});
	res.send('200 Ok');
});

// update server
function updateServer(req: any, res: any) {
	const body = req.body;
	const jobId = req.params.jobId;

	if (!body.stats) {
		res.status(400).send('Invalid body');
		return;
	}

	let serverIndex = servers.findIndex((server) => server?.jobId === jobId);
	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	console.log(`Server updated: ${jobId}`);
	servers[serverIndex] = {
		jobId,
		created: server.created,
		players: server.players,
		stats: {
			viewers: server.stats.viewers,
			averagePing: body.stats.averagePing,
			serverFps: body.stats.serverFps,
			location: server.stats.location,
		},
	};
	res.send('200 Ok');

	broadcast({
		type: 'statsUpdated',
		data: {
			stats: {
				viewers: connections.length,
				averagePing: body.stats.averagePing,
				serverFps: body.stats.serverFps,
				location: server.stats.location,
			},
		},
	});
}

app.patch('/api/servers/:jobId/', updateServer);
app.post('/api/servers/:jobId/update', updateServer);

// get servers
app.get('/api/servers/', function (req: any, res: any) {
	// if server not found do 404
	if (!servers) {
		res.status(404).send('No servers are online');
		return;
	}

	res.send(servers);
});

// get server
app.get('/api/servers/:jobId', function (req: any, res: any) {
	const body = req.body;
	const jobId = req.params.jobId;

	// if server not found do 404
	const server = servers.find((server) => server.jobId === jobId);

	if (!server) {
		res.status(404).send('Server not found');
		return;
	}
	res.send(server);
});

// delete server
function deleteServer(req: any, res: any) {
	const jobId = req.params.jobId;

	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	servers.slice(servers.indexOf(server));

	res.send('200 Ok');
	// broadcast remove all players
	for (const player of server.players) {
		broadcast({
			type: 'playerDeleted',
			data: {
				userId: player?.userId,
			},
		});
	}
}

app.delete('/api/servers/:jobId', deleteServer);
app.get('/api/servers/:jobId/delete', deleteServer);

// create player
// req body: {username, displayName, rank?, data: {position: {x, y, z}}}
function createPlayer(req: any, res: any) {
	const body = req.body;
	const jobId = req.params.jobId;
	const userId = req.params.userId;

	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	const player = server.players.find((player) => player?.userId === userId);
	if (player) {
		res.status(409).send('Player already exists');
		return;
	}

	server.players.push({
		userId,
		username: body.username,
		displayName: body.displayName,
		rank: body.rank ?? 'Player',
		data: {
			position: {
				x: body.data.position.x,
				y: body.data.position.y,
				z: body.data.position.z,
			},
			rotation: {
				y: body.data.rotation.y,
			},
		},
	});
	console.log(`New player created: ${userId}`);
	res.send('200 Ok');
	broadcast({
		type: 'playerAdded',
		data: {
			userId,
			username: body.username,
			displayName: body.displayName,
			rank: body.rank ?? 'Player',
			data: {
				position: {
					x: body.data.position.x,
					y: body.data.position.y,
					z: body.data.position.z,
				},
				rotation: {
					y: body.data.rotation.y,
				},
			},
		},
	});
}
app.post('/api/servers/:jobId/players/:userId', createPlayer);

// get player
app.get('/api/servers/:jobId/players/:userId', function (req: any, res: any) {
	const jobId = req.params.jobId;
	const userId = req.params.userId;

	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	if (!server.players) {
		res.status(404).send('Server has no players');
		return;
	}

	const player = server.players.find((player) => player?.userId === userId);
	if (!player) {
		res.status(404).send('Player not found');
		return;
	}

	res.send(player);
});

// update player
function updatePlayer(req: any, res: any) {
	const body = req.body;
	const jobId = req.params.jobId;
	const userId = req.params.userId;

	if (!body.data) {
		res.status(400).send('Invalid body');
		return;
	}

	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	if (!server.players) {
		res.status(404).send('Server has no players');
		return;
	}

	let playerIndex = server.players.findIndex((player) => player?.userId === userId);
	const player = server.players?.[playerIndex];

	if (!player) {
		res.send('Player not found, creating');
		createPlayer(req, res);
		return;
	}

	console.log(`Player updated: ${userId}`);
	server.players[playerIndex] = {
		userId,
		username: player.username,
		displayName: player.displayName,
		rank: player.rank,
		data: {
			position: {
				x: body.data.position.x,
				y: body.data.position.y,
				z: body.data.position.z,
			},
			rotation: {
				y: body.data.rotation.y,
			},
		},
	};
	res.send('200 Ok');

	broadcast({
		type: 'playerUpdated',
		data: {
			userId,
			data: {
				position: {
					x: body.data.position.x,
					y: body.data.position.y,
					z: body.data.position.z,
				},
				rotation: {
					y: body.data.rotation.y,
				},
			},
		},
	});
}

app.patch('/api/servers/:jobId/players/:userId', updatePlayer);
app.post('/api/servers/:jobId/players/:userId/update', updatePlayer);

// delete player
function deletePlayer(req: any, res: any) {
	const jobId = req.params.jobId;
	const userId = req.params.userId;

	const server = servers.find((server) => server.jobId === jobId);
	if (!server) {
		res.status(404).send('Server not found');
		return;
	}

	if (!server.players) {
		res.status(404).send('Server has no players');
		return;
	}

	const player = server.players.find((player) => player?.userId === userId);
	if (!player) {
		res.status(404).send('Player not found');
		return;
	}

	server.players.slice(server.players.indexOf(player));

	res.send('200 Ok');

	broadcast({
		type: 'playerDeleted',
		data: {
			userId,
		},
	});
}

app.delete('/api/servers/:jobId/players/:userId', deletePlayer);
app.get('/api/servers/:jobId/players/:userId/delete', deletePlayer);

// get roblox headshot of user
app.get('/api/headshot/:userId', async function (req: any, res: any) {
	const userId = req.params.userId;
	const size = req.query.size ?? 48;
	let response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=${size}x${size}&format=Png&isCircular=true`);
	const json = await response.json();

	if (json.errors) {
		res.status(500).send(json.errors[0]);
		return;
	}

	const imageUrl = json.data[0]?.imageUrl;

	// send image contents
	response = await fetch(imageUrl);
	const imageBuffer = await response.arrayBuffer();
	res.set('Content-Type', 'image/png');
	res.send(Buffer.from(imageBuffer));
});

app.ws('/ws', function (ws, req) {
	connections.push(ws);
	console.log('client connected');

	broadcast({
		type: 'statsUpdated',
		data: {
			stats: {
				viewers: connections.length,
				averagePing: servers[0].stats.averagePing,
				serverFps: servers[0].stats.serverFps,
				serverLocation: servers[0].stats.location,
			},
		},
	});
});

function broadcast(data: WebhookEvent) {
	connections.forEach((ws) => {
		ws.send(JSON.stringify(data));
	});
}

app.listen(process.env.PORT);
console.log(`Listening on ${process.env.PORT}`);

interface Server {
	jobId: String;
	created: Number; // epoch seconds
	players: [Player?];
	stats: {
		viewers: Number;
		averagePing: Number;
		serverFps: Number;
		location: String;
	};
}

interface Player {
	userId: String;
	username: String;
	rank: String;
	displayName: String;
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

interface WebhookEvent {
	type: 'playerAdded' | 'playerUpdated' | 'playerDeleted' | 'statsUpdated';
	data: Object;
}
