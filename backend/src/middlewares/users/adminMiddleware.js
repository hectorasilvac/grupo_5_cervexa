const adminMiddleware = (req, res, next) => {
        const user = req?.session?.userLogged;
        const adminPermission = 1;

        if (user === undefined || user.rank_id !== adminPermission) {
            return res.redirect('/users/login');
        }
    next();
};

module.exports = adminMiddleware;