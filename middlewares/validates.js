const Joi = require("joi");

const registerValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(30)
            .pattern(
                new RegExp(
                    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
                )
            )
            .required(),
        username: Joi.string().alphanum().min(3).max(30).required(),

        email: Joi.string()
            .min(10)
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$"))
            .required(),
    });

    return schema.validate(data);
};

const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(10)
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    });

    return schema.validate(data);
};

module.exports = { registerValidate, loginValidate };
