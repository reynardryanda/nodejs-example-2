module.exports = (sequelize) => {
    const { User, Role } = sequelize.models;

    Role.hasMany(User);
    User.belongsTo(Role);
};
