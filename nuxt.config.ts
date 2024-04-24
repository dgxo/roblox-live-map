// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			title: 'Roblox Live',
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	modules: [
		'@nuxt/ui',
		'@nuxtjs/color-mode',
		'nuxt-icon',
		[
			'nuxt-mongoose',
			{
				devtools: true,
			},
		],
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
