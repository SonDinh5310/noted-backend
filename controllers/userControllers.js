const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/configs.js');
const { registerValidate, loginValidate } = require('../middlewares/validates');

class UserControllers {
    register = async (req, res) => {
        const { error } = registerValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const emailExists = await UserModel.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).send('Email already exists in database');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });

        try {
            const user = await newUser.save();
            res.send(`Success!! new user:\n${user}`);
        } catch (error) {
            res.status(400).send(`Error occured: ${error}`);
        }
    };

    login = async (req, res) => {
        const { error } = loginValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .send("There's no user with this email in database");
        }

        const loginPasswordCheck = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!loginPasswordCheck) {
            return res.status(400).send('Password incorrect!');
        }

        const token = jwt.sign({ id: user._id }, config.privateKey, {
            expiresIn: '12h',
        });

        try {
            res.header('auth-token', token).send(`Success!\n${token}`);
        } catch (error) {
            res.status(400).send(`Error occured: ${error}`);
        }
    };
}

module.exports = new UserControllers();
