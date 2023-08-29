const mix = require( 'laravel-mix' );
const postcssCustomMedia = require('postcss-custom-media');
const postcssGlobalData = require('@csstools/postcss-global-data');

mix.setPublicPath( 'dist/' );
mix.setResourceRoot( '/wp-content/themes/oisi-isp/dist/' );

mix.webpackConfig( {
	stats: {
		children: true,
	},
} );

const postCSSPlugins = [
	postcssGlobalData({
		files: [
			'assets/css/variables/_queries.css',
		]
	}),
	postcssCustomMedia(),
];

mix.postCss( 'assets/css/main.css', 'css', postCSSPlugins );
mix.postCss( 'assets/css/editor.css', 'css', postCSSPlugins );

mix.js( 'assets/js/main.js', 'js' );

// mix.copy( 'assets/images', 'dist/images' );

