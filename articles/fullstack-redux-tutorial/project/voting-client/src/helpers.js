import uuid from 'uuid';

export function getUserId() {
	let clientId = localStorage.getItem('clientId');
	if (clientId) {
		return clientId;
	} else {
		clientId = uuid.v4();
		localStorage.setItem('clientId', clientId);
		return clientId;
	}
}