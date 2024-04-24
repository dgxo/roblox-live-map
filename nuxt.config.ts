// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxtjs/color-mode',
		'nuxt-icon',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					'DM Sans': [400, 500, 700],
				},
			},
		],
	],
	ui: {
		icons: ['material-symbols'],
	},
});
