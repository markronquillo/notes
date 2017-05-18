// we emit an action only if it is remote related
// criteria: metadata: { remote: true }
export default socket => store => next => action => {
	if (action.meta && action.meta.remote) {
		socket.emit('action', action);
	}
	return next(action);
}