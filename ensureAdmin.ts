// ensureAdmin.js

function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'ADMIN') {
        return next();
    } else {
        res.status(403).send('Forbidden');
    }
}

module.exports = ensureAdmin;
