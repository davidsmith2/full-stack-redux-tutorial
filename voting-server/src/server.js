import Server from 'socket.io';

export default function startServer(store) {
	const io = new Server().attach(8090);
	// Send state snapshot to clients after every action
	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);
	io.on('connection', (socket) => {
		// Send state snapshot to clients on connection to the application
		socket.emit('state', store.getState().toJS());
		// Receive updates to state from clients
		socket.on('action', store.dispatch.bind(store));
	});
};
