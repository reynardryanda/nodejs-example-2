const sequelize = require('../../models');
const { UserService } = require('../../services');

const userService = new UserService(sequelize);

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const isUsernameUnique = await userService.isUsernameUnique(
        req.body.username
    );
    if (!isUsernameUnique) {
        return res.status(400).send({
            message: 'Failed! Username is already in use!',
        });
    }

    const isEmailUnique = await userService.isEmailUnique(req.body.email);
    if (!isEmailUnique) {
        return res.status(400).send({
            message: 'Failed! Email is already in use!',
        });
    }

    next();
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!["user","moderator","admin"].includes(req.body.roles[i])) {
                res.status(400).send({
                    message:
                        'Failed! Role does not exist = ' + req.body.roles[i],
                });
                return;
            }
        }
    }

    next();
};

module.exports = {
    checkDuplicateUsernameOrEmail,
    // checkRolesExisted,
};
