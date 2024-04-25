// update server with jobId
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	try {
		return await ServerSchema.findOneAndUpdate({ jobId: event.context.params?.jobId }, body, { new: true });
	} catch (error) {
		return error;
	}
});
