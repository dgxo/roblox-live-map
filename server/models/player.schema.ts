import { defineMongooseModel } from '#nuxt/mongoose';
import { Types } from 'mongoose';

export const playerSchema = defineMongooseModel({
	name: 'Player',
	schema: {
		userId: {
			type: Number,
			required: true,
		},
		displayName: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		rank: {
			type: String,
			required: true,
		},
		server: {
			type: Types.ObjectId,
			ref: 'Server',
			required: true,
		},
		position: {
			x: {
				type: Number,
				required: true,
			},
			y: {
				type: Number,
				required: true,
			},
			z: {
				type: Number,
				required: true,
			},
		},
		rotation: {
			type: Number,
			required: true,
		},
	},
	options: {},
	hooks(schema: any) {
		// schema.pre('save', function (this: any, next: () => void) {
		// 	if (this.id) next();
		// 	throw createError({
		// 		statusCode: 500,
		// 		statusMessage: 'Validation failed',
		// 	});
		// });
	},
});
