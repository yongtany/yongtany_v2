import Joi from 'joi';

export const passwordReg = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
export const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  signUp: {
    body: {
      email: Joi.string()
        .regex(emailReg)
        .required(),
      password: Joi.string()
        .regex(passwordReg)
        .required(),
      name: Joi.string().required(),
      username: Joi.string().required(),
    },
  },
  signIn: {
    body: {
      email: Joi.string()
        .regex(emailReg)
        .required(),
      password: Joi.string()
        .regex(passwordReg)
        .required(),
    },
  },
}