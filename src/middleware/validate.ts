import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

import { HttpCode } from "@constants/enum";

type ValidateFieldType = Record<string, any> | Record<string, any>[];

const validateRequestBody =
  <T extends ValidateFieldType>(schema: yup.ObjectSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      if (Array.isArray(body)) {
        // Validate the multiple record
        await Promise.all(
          body.map((element, index) =>
            schema.validate(element, { abortEarly: false }).catch((err) => {
              err.inner.forEach((validationError: any) => {
                validationError.path = `${validationError.path}[${index}]`;
              });
              throw err;
            }),
          ),
        );
      } else {
        // Validate the single record
        await schema.validate(body, { abortEarly: false });
      }
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

export const validateRequestArrayBody =
  (schema: yup.ArraySchema<(string | undefined)[] | undefined, yup.AnyObject, "", "">) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      await schema.validate(body, { abortEarly: false });
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
