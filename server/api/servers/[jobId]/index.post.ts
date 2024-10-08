// create server with jobId
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	try {
		ServerSchema.create(body);
	} catch (error) {
		return error;
	}
});
