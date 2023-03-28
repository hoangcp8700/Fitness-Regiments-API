import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup.string().required(),
  userName: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

const loginSchema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required(),
});

export default {
  registerSchema,
  loginSchema,
};
