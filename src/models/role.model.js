const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'Role',
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            // Other model options go here
            schema: 'applicants',
            tableName: 'roles',
        }
    );
