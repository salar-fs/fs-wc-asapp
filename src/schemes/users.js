import * as Joi from '@hapi/joi';

const passwordSchema = Joi.string()
    .max(32).error(new Error('Password must be at most 32 characters'))
    .min(8).error(new Error('Password must be at least 8 characters'))
    .required();
const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['io'] } }).error(new Error('Email is not valid'))
        .required(),
    password: passwordSchema,
    retypedPassword: passwordSchema
}).with('password', 'retypedPassword');

export const userSchemes = {
    loginSchema,
};
