const { request, response } = require('express');

const hasRoles = (...roles) => {
    return async (req = request, res = response, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
        req.user = req.user;
        next();
    };
};

module.exports = {
    hasRoles
};