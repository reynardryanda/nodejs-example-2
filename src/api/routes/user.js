// import { Router } from 'express';
const { Router } = require('express');
const route = Router();
const sequelize = require('../../models');
const UserService = require('../../services/userService');

const { User } = sequelize.models;
const userService = new UserService(sequelize);

const {authJwt} = require('../middlewares')

module.exports = (router) => {
    router.use('/users', route);

    route.post('/create', [authJwt.verifyToken], async (req, res) => {
        try {
            const userModel = User.build({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            });
            const user = await userService.createUser(userModel);
            return res.status(200).json({
                message: '/user/profile (Get) berhasil',
                user,
            });
        } catch (err) {
            return res.status(404).json({
                error: err.message,
            });
        }
    });

    route.get('/delete', async (req, res) => {
        try {
            await service.deleteUser();
            return res.status(200).json({
                message: 'berhasil delete',
            });
        } catch (err) {
            return res.status(404).json({
                message: err,
            });
        }
    });

    route.get('/get', async (req, res) => {
        try {
            const user = await service.getUserByFirstname();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(404).json({
                message: err,
            });
        }
    });

    /**
     * @api {post} /api/user Create user
     * @apiName Create new user
     * @apiPermission admin
     * @apiGroup User
     *
     * @apiParam  {String} [userName] username
     * @apiParam  {String} [email] Email
     * @apiParam  {String} [phone] Phone number
     * @apiParam  {String} [status] Status
     *
     * @apiSuccess (200) {Object} mixed `User` object
     */

    route.put('/update', async (req, res) => {
        try {
            const user = await service.updateUserByUsername(req.body);
            return res.status(200).json(user[1][0]);
        } catch (err) {
            return res.status(404).json({
                error: err.message,
            });
        }
    });
};
