import { HttpCode } from "@constants/enum";

interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  description: string;
}

export class AppError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpCode;

  constructor(args: AppErrorArgs) {
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    Error.captureStackTrace(this);
  }
}
// EXAMPLE:
// throw new AppError({
//   httpCode: HttpCode.UNAUTHORIZED,
//   description: "You must be logged in",
// });
