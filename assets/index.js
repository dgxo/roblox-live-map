const map = document.querySelector('#map');
const canvas = document.querySelector('canvas');
const playerList = document.querySelector('#player-list');
const statusIndicator = document.querySelector('#status-indicator');
const statusText = statusIndicator.querySelector('#status');
const debugText = document.querySelector('#debug');
const statsTable = document.querySelector('#stats-table');
const clearButton = document.querySelector('#clear-cache');

const socket = new ReconnectingWebSocket(`wss://${location.host}/ws`);

fetch('/api/servers/')
	.then((response) => response.json())
	.then((data) => {
		players.clear();
		data.forEach((server) => {
			server.players.forEach((player) => {
				if (document.querySelector(`#player-pin-${player.userId}`)) {
					players.update(player);
				} else {
					players.add(player);
				}
			});
		});
	});

socket.addEventListener('open', (_event) => {
	statusIndicator.classList = 'status-indicator connected';
	statusText.innerHTML = `Connected`;
});

socket.addEventListener('error', (event) => {
	statusIndicator.classList = 'status-indicator error';
	statusText.innerHTML = `Connection error: <code>${JSON.stringify(event, null, 1)}</code>`;
});

socket.addEventListener('message', (event) => {
	const data = JSON.parse(event.data);
	// debugText.textContent = JSON.stringify(data, null, 3);
	console.log('Message', data);

	switch (data.type) {
		case 'playerAdded':
			players.add(data.data);
			break;
		case 'playerUpdated':
			players.update(data.data);
			break;
		case 'playerDeleted':
			players.delete(data.data);
			break;
		case 'statsUpdated':
			statsTable.querySelector('#viewers').textContent = data.data.stats.viewers;
			statsTable.querySelector('#average-ping').textContent = `${data.data.stats.averagePing}ms`;
			statsTable.querySelector('#server-fps').textContent = data.data.stats.serverFps;
			statsTable.querySelector('#server-location').textContent = data.data.stats.serverLocation;
			break;
	}
});

let playerCount = 0;
const players = {
	add: async (data) => {
		// add to player list
		const playerItem = playerList.querySelector('#player-template').cloneNode(true);
		playerItem.id = `player-${data.userId}`;
		playerItem.title = `User ID: ${data.userId}`;
		playerItem.querySelector('#player-display-name').textContent = data.displayName;
		playerItem.querySelector('#player-username').textContent = data.username;
		playerItem.hidden = null;
		playerItem.querySelector('img').src = `/api/headshot/${data.userId}?size=100`;
		playerList.appendChild(playerItem);

		// add to map
		const playerPin = document.createElement('img');
		playerPin.src = `/api/headshot/${data.userId}?size=100`;
		playerPin.className = 'player-pin';
		playerPin.id = `player-pin-${data.userId}`;
		playerPin.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		playerPin.style.translate = `${data.data.position.x + 15}px ${data.data.position.y + 15}px`;
		playerPin.style.rotate = `${data.data.rotation.y}deg`;
		map.appendChild(playerPin);

		// update stats
		playerCount++;
		statsTable.querySelector('#players').textContent = playerCount;
	},
	update: (data) => {
		// update player pin
		const playerPin = document.querySelector(`#player-pin-${data.userId}`);
		if (!playerPin) {
			console.error('Player pin not found');
			return;
		}
		playerPin.style.translate = `${data.data.position.x + 15}px ${data.data.position.y + 15}px`;
		playerPin.style.rotate = `${data.data.rotation.y}deg`;
	},
	delete: (data) => {
		// delete player item
		const playerItem = document.querySelector(`#player-${data.userId}`);
		if (!playerItem) {
			console.error('Player item not found');
			return;
		}
		playerItem.remove();

		// delete player pin
		const playerPin = document.querySelector(`#player-pin-${data.userId}`);
		if (!playerPin) {
			console.error('Player pin not found');
			return;
		}
		playerPin.remove();

		playerCount--;
		statsTable.querySelector('#players').textContent = playerCount;
	},
	clear: () => {
		document.querySelectorAll('.player:not(#player-template)').forEach((playerItem) => playerItem.remove());
		document.querySelectorAll('.player-pin').forEach((pin) => pin.remove());

		playerCount = 0;
		statsTable.querySelector('#players').textContent = playerCount;
	},
};

clearButton.addEventListener('click', players.clear);
