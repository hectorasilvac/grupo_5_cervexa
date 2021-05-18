const db = require('../../../database/models');
const { existsInDB } = require('../../utilities');

const userLoggedMiddleware = async (req, res, next) => {
    res.locals.isLogged = false;

    // Check if there is an e-mail in the cookies to log in automatically
    const emailInCookie = req?.cookies?.userEmail;
    if (emailInCookie) {
        const user = await existsInDB({
            model: db.User,
            condition: {
                email: emailInCookie
            }
        });

        if (user) {
            // Store only non-sensitive user information
            const userInfo = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                profile_image: user.profile_image,
                rank_id: user.rank_id
            };

         // Establish a login session and assign user information to it
            req.session.userLogged = userInfo;
        }
    }

    // Check if the user has logged in succesfully
    const emailInSession = req?.session?.userLogged?.email;
    if (emailInSession) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;