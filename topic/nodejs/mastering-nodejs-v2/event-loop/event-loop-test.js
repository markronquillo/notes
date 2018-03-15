let stop = false
setTimeout(() => {
	stop = true
}, 1000);

console.log('This will not end since the while loop will not give a chance for the setTimeout callback to be called');
while(stop === false) {};

