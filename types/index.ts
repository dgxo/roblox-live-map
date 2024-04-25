import type { ObjectId } from 'mongoose';

export interface Server {
	_id: ObjectId | string;
	jobId: string;
	createdAt: number; // epoch seconds
	players: Player[] | [];
	stats: {
		viewers: number;
		averagePing: number;
		serverFps: number;
		location: string;
	};
}

export interface Player {
	_id: ObjectId | string;
	userId: number;
	username: string;
	rank: string;
	displayName: string;
	data: {
		position: {
			x: number;
			y: number;
			z: number;
		};
		rotation: {
			y: number;
		};
	};
}
