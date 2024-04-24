export const User = defineMongooseModel({
	name: 'User',
	schema: {
		id: {
			type: 'number',
			required: true,
		},
		displayName: {
			type: 'string',
			required: true,
		},
		username: {
			type: 'string',
			required: true,
		},
	},
	options: {},
	hooks(schema) {},
});
