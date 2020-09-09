const Joi = require('joi')
const schemas = {
    userPOST: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        isLoggedIn:Joi.bool()
    }),
  
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
    }),
    getFiles: Joi.object().keys({
        uid:Joi.number().required()
    }),

    uploadFiles: Joi.object().keys({
        file:Joi.array().required()

    }),

    deleteFiles: Joi.object().keys({
        file:Joi.object().required()
    })
  
};
module.exports = schemas;