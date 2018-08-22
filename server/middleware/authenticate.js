let { User } = require('./../models/user');

let authenticate = (req, res, next) => { //authentication for users
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = { authenticate };