var environments = {};

// Staging (default) environments

environments.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	envName: 'staging',
	hashingSecret: 'thisisasecret'
};

// Production environment
environments.production = {
	httpPort: 5000,
	httpsPort: 5001,
	envName: 'production',
	hashingSecret: 'thisisasecret'
};

var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';
var environment = environments[currentEnvironment];
var environmentToExport = typeof(environment) === 'object' ? environment : environments.staging;

module.exports = environmentToExport;
