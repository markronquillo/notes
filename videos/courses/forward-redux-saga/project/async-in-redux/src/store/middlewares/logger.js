export default ({getState, dispatch}) => next => action => {
	let result = next(action);

	if (process.env.NODE_ENV !== 'production') {
		console.log('dispatching', action);
		console.log('next state', getState());
	}
	return result;
}