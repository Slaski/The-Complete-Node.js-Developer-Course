console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Inside a fast timeout callback');
}, 0);

console.log('Ending app');