import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import { HttpCode } from "@constants/enum";

const validateRequestBody =
  <T extends object>(schema: yup.ObjectSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      const validationErrors = error.inner.reduce(
        (acc: Record<string, string[]>, err: yup.ValidationError) => {
          if (err.path) {
            acc[err.path] = err.errors;
          }
          return acc;
        },
        {},
      );

      res.status(HttpCode.UNPROCESSABLE_CONTENT).json({ errors: validationErrors });
    }
  };

export default validateRequestBody;

// EXAMPLE
// const registerSchema = yup.object().shape({
//   email: yup.string().required(),
//   userName: yup.string().required(),
//   password: yup.string().min(8).max(32).required(),
// });
// validateRequestBody(registerSchema);
