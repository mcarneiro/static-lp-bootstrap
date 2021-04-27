const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const watch = require('metalsmith-watch')

const devMode = process.argv.indexOf('--dev') >= 0

const getConfig = name => process.env[`npm_config_${name}`] || process.env[`npm_package_config_${name}`]

Metalsmith(__dirname)
	.metadata({
		title: 'Landing Page Title',
		description: 'Landing Page Description',
		spotify: {
			clientID: getConfig('spotify_client_id'),
			artistID: getConfig('spotify_artist_id'),
			albumID: getConfig('spotify_album_id'),
			redirectURI: getConfig('spotify_redirect_uri'),
			scope: getConfig('spotify_scope')
		},
		deezer: {
			clientID: getConfig('deezer_client_id'),
			artistID: getConfig('deezer_artist_id'),
			albumID: getConfig('deezer_album_id'),
			redirectURI: getConfig('deezer_redirect_uri'),
			scope: getConfig('deezer_scope')
		},
		url: devMode ? getConfig('dev_url') : getConfig('prod_url')
	})
	.source('./src/data')
	.destination('./www')
	.clean(false)
	.use(layouts({
		engine: 'pug',
		directory: 'src/pug',
		default: 'home.pug',
		pattern: '**/*'
	}))
	.use(devMode && watch({
		paths: {
			'${source}/**/*': true,
			'src/pug/**/*': '**/*'
		},
		livereload: true,
	}))
	.build((err, files) => {
		if (err) {
			throw err;
		}
	});

