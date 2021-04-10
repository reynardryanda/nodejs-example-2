const { Router } = require('express');
const { user, file, auth } = require('./routes');

module.exports = () => {
    const router = Router();
    file(router);
    user(router);
    auth(router)
    return router;
};
