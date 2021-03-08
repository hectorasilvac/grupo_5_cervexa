const Database = require('../../models/Database');
const User = new Database('User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    const emailInCookie = req?.cookies?.userEmail;
    const userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie) {
        const { password, ...userInfo } = userFromCookie;
        req.session.userLogged = userInfo;
    }

    if(req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;