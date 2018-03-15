const events =require('events')

function nextTick1() {
	function getEmitter() {
		let emitter = new events.EventEmitter();
		process.nextTick(() => {
			emitter.emit('start');
		});
		return emitter;
	}

	let myEmitter = getEmitter();

	myEmitter.on('start', () => {
		console.log('Started');
	});
}

function nextTick2() {
	function getEmitter() {
		let emitter = new events.EventEmitter();
		emitter.on('start', () => {
			console.log('Started');
		});
		emitter.emit('start');
		return emitter;
	}

	let myEmitter = getEmitter();

}
nextTick2()

