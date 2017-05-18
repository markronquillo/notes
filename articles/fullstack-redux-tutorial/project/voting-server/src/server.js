import Server from 'socket.io';

export default function startServer(store) {

    const io = new Server().attach(8090);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {

		// whenever a new client connects, 
		// we broadcast the current state to all,
		// so that the new client can have a copy of the state
        socket.emit('state', store.getState().toJS());

        // define a websocket endpoint for listening
        socket.on('action', store.dispatch.bind(store));
    });
}


