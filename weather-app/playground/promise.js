var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 2500);
    });
};

asyncAdd(5, 7).then((result) => {
    console.log('Result:', result);
    return asyncAdd(result, '33');
}).then((result) => {
    console.log('Result:', result);
}).catch(errorMessage => {
    console.log(errorMessage);
});