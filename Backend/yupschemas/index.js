const yup = require("yup");
const Messages = require("../utils/messages");

const regSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/^(2547|2541)\d{8}$/, Messages.invalidPhoneNumber)
    .required(),
  referrer: yup.string(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      Messages.passwordRegex
    )
    .required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const updatePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      `Old ${Messages.passwordRegex}`
    )
    .required(),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      `New ${Messages.passwordRegex}`
    )
    .required(),
});

const depositSchema = yup.object().shape({
  amount: yup.number().required(),
  phone: yup
    .string()
    .matches(/^(2547|2541)\d{8}$/, Messages.invalidPhoneNumber)
    .required(),
});

const withdrawalSchema = yup.object().shape({
  amount: yup.number().required(),
  phone: yup
    .string()
    .matches(/^(2547|2541)\d{8}$/, Messages.invalidPhoneNumber)
    .required(),
});

module.exports = {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  depositSchema,
  withdrawalSchema,
};
