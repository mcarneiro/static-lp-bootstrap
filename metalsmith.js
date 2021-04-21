const Metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const watch = require('metalsmith-watch')

const devMode = process.argv.indexOf('--dev') >= 0

Metalsmith(__dirname)
	.metadata({
		title: "Landing Page Title",
		description: "Landing Page Description",
		url: devMode ? "/" : "http://www.website.io/"
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
			"${source}/**/*": true,
			"src/pug/**/*": "**/*"
		},
		livereload: true,
	}))
	.build((err, files) => {
		if (err) {
			throw err;
		}
	});

