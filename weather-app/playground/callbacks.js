var getUser = (id, callback) => {
    var user = {
        id,
        name: 'Slaski'
    };
    setTimeout(() => callback(user), 3000);
};

getUser(10, (user) => {
    console.log(user);
});