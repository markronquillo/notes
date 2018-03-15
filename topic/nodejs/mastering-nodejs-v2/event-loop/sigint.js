console.log('Running...');

setInterval(() => {}, 1e6);

process.on('SIGINT', () => {
	console.log('We received the SIGINT signal!');
	process.exit(1);
});
