const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define(
        'File',
        {
            type: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            data: {
                type: DataTypes.BLOB('medium'),
            },
        },
        {
            // Other model options go here
            schema: 'applicants',
            tableName: 'files',
        }
    );
