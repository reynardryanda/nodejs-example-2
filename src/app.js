const routes = require('./api');
const sequelize = require('./models');
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();


async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', routes());

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening at http://localhost:3000`);
    });
}



init();
