module.exports = {
	staticFileGlobs: [
	  './index.html',
	  './images/*.{png,svg,gif,jpg}',
	  './scripts/*.js',
	  './styles/*.css'
	],
	stripPrefix: '.',
	runtimeCaching: [{
	  urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
	  handler: 'networkFirst',
	  options: {
	    cache: {
	      name: 'weatherData-v3'
	    }
	  }
	}]
}