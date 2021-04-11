const db = require('../../../database/models');
const { existsInDB } = require('../../utilities');

const userLoggedMiddleware = async (req, res, next) => {
    res.locals.isLogged = false;

    if(req.cookies.userEmail) {
        const emailInCookie = req.cookies.userEmail;
        const userFromCookie = await existsInDB({
            model: db.User,
            condition: { email: emailInCookie }
        });
    
        if(userFromCookie) {
        const {
            id,
            email,
            first_name: firstName,
            last_name: lastName,
            profile_image: profileImage,
            rank_id: rankId
        } = userFromCookie;
        const userInfo = { id, email, firstName, lastName, profileImage, rankId };
            req.session.userLogged = userInfo;
        }
    
        if(req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
    }
    next();
}

module.exports = userLoggedMiddleware;