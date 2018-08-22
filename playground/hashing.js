const jwt =  require('jsonwebtoken');
const { SHA256 } = require('crypto-js');
const bcrypt = require('bcryptjs');

let password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

let hashedPassword = `$2a$10$UUj3IjrDLPW52hmLsMHc7OLYhv.seH874o6rUmTne6yQBvAB88DBO`;

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };

// let token = {
//     data, 
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not charged');
// } else {
//     console.log('Data was changed. Do not trust!');
// }

// let data = {
//     id: 10
// };
// jwt.sign;

// let token = jwt.sign(data, '123abc');
// console.log(token);

// let decoded = jwt.verify(token + 1, '123abc');
// console.log('decoded', decoded);

