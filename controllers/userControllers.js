const UserModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/configs.js');
const { registerValidate, loginValidate } = require('../middlewares/validates');

class UserControllers {
    register = async (req, res) => {
        const { error } = registerValidate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }

        const emailExists = await UserModel.findOne({
            email: req.body.email,
        }).select('-password');
        if (emailExists) {
            return res.json({ error: 'Email already exists in database' });
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
            res.send(user);
        } catch (error) {
            res.json({ error: error });
        }
    };

    login = async (req, res) => {
        const { error } = loginValidate(req.body);
        if (error) {
            return res.send(error.details[0].message);
        }

        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return (
                res
                    // .status(404)
                    .json({
                        error: "There's no user with this email in database",
                    })
            );
        }

        const loginPasswordCheck = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!loginPasswordCheck) {
            return res.status(400).json({ error: 'Password incorrect!' });
        }

        const token = jwt.sign({ id: user._id }, config.privateKey, {
            expiresIn: '12h',
        });

        try {
            delete user._doc.password;
            return res.header('auth-token', token).status(200).json(user._doc);
        } catch (error) {
            res.json({
                status: 400,
                error: 'Wrong email or password',
            });
        }
    };
}

module.exports = new UserControllers();
