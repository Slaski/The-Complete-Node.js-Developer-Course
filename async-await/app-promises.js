const users = [{
    id: 1,
    name: 'Slaski',
    schoolId: 121
}, {
    id: 2,
    name: 'B6',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 121,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 3,
    schoolId: 121,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);
        
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
};

// const getStatus = (userId) => {
//     let user;
//     return getUser(userId)
//         .then(tempUser => {
//             user = tempUser;
//             return getGrades(user.schoolId);
//         })
//         .then(grades => {
//             let average = 0;

//             if (grades.length > 0) {
//                 average = grades.map(g => g.grade).reduce((a, b) => a + b) / grades.length; 
//             }

//             return `${user.name} has a ${average}% in the class.`;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

const getStatus = async (userId) => {
    var user = await getUser(userId);
    var grades = await getGrades(user.schoolId);
    let average = 0;

    if (grades.length > 0) {
        average = grades.map(g => g.grade).reduce((a, b) => a + b) / grades.length; 
    }

    return `${user.name} has a ${average}% in the class.`;
};

// getUser(2)
//     .then(user => {
//         console.log(user);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// getGrades(121)
//     .then(grades => {
//         console.log(grades);
//     })
//     .catch(err => {
//         console.log(err);
//     });

getStatus(1)
    .then(status => console.log(status))
    .catch(err => console.log(err));