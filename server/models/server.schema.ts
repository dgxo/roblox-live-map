import { defineMongooseModel } from '#nuxt/mongoose';
import { Types } from 'mongoose';

export const serverSchema = defineMongooseModel({
	name: 'Server',
	schema: {
		jobId: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Number,
			required: true,
		},
		players: [
			{
				type: Types.ObjectId,
				ref: 'Player',
			},
		],
		stats: {
			viewers: {
				type: Number,
				default: 0,
			},
			averagePing: {
				type: Number,
				required: true,
			},
			serverFps: {
				type: Number,
				required: true,
			},
			location: {
				type: String,
				required: true,
			},
		},
	},
	options: {},
	hooks(schema) {
		schema.pre('save', function (this, next) {
			// if (this.id && this.displayName && this.username) next();
			// throw createError({
			// 	statusCode: 500,
			// 	statusMessage: 'Validation failed',
			// });
		});
	},
});
