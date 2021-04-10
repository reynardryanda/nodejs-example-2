const { Sequelize } = require('sequelize');
const association = require('./association');
// const Role = require('./role.model');

const sequelize = new Sequelize('applicant_db', 'postgres', 'kingdom2', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const modelDefiners = [require('./user.model'), require('./file.model'), require('./role.model')];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

association(sequelize);

sequelize.sync({ force: true });

sequelize.models.Role.create({
    id: 1,
    name: 'user',
});

sequelize.models.Role.create({
    id: 2,
    name: 'moderator',
});

sequelize.models.Role.create({
    id: 3,
    name: 'admin',
});
module.exports = sequelize;
