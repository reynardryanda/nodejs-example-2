class UserService {
    constructor(sequelize) {
        this.sequelize = sequelize;
        this.user = sequelize.models.User;
    }

    async createUser(user) {
        try {
            await user.validate();
            return await this.sequelize.transaction(
                async (transaction) => await user.save({ transaction })
            );
        } catch (err) {
            throw err;
        }
    }

    async deleteUser() {
        try {
            return await this.sequelize.transaction(
                async (transaction) =>
                    await this.user.destroy(
                        {
                            where: {
                                username: 'reynardryanda',
                            },
                        },
                        { transaction }
                    )
            );
        } catch (err) {
            throw err;
        }
    }

    async getUserByFirstname() {
        try {
            return await this.sequelize.transaction(
                async (transaction) =>
                    await this.user.findOne({
                        where: {
                            username: 'reynardryanda',
                        },
                        transaction,
                    })
            );
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update the user based on his/her username.
     * @param {Object} user - The user going to be updated.
     * @param {String} user.firstName - The first name of the employee.
     * @param {String} user.lastName - The last name of the employee.
     * @returns {Promise<Array<Number,Array<Object>>>} Promise that returns an array with one or two elements. The first element is always the number of affected rows, while the second element is the actual affected rows.
     */

    async updateUserByUsername(user) {
        try {
            return await this.sequelize.transaction(
                async (transaction) =>
                    await this.user.update(
                        { lastName: user.lastName },
                        {
                            where: {
                                username: 'reynardryanda',
                            },
                            transaction,
                            returning: true,
                        }
                    )
            );
        } catch (err) {
            throw err;
        }
    }

    async isUsernameUnique(username) {
        try {
            const user = await this.user.findOne({
                where: {
                    username: username,
                },
            });
            if (user) {
                return false;
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    async isEmailUnique(email) {
        try {
            const user = await this.user.findOne({
                where: {
                    email: email,
                },
            });
            if (user) {
                return false;
            }
            return true;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;
