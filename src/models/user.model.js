const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'User',
        {
            // Model attributes are defined here
            username: {
                type: DataTypes.STRING,
                validate: {
                    isAlphanumeric: true
                }
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
        },
        {
            // Other model options go here
            schema: 'applicants',
            tableName: 'users',
        }
    );
