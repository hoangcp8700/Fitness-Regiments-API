import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup.string().required(),
  userName: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

export default {
  registerSchema,
};
