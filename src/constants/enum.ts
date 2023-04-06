export enum RoleType {
  Admin = "admin",
  User = "user",
  Supper = "superAdmin",
}
export enum RoleCategoryType {
  All = "all",
  User = "user",
}

export enum DateType {
  Week = "week",
  Month = "month",
}

export enum WorkoutItemType {
  Exercise = "exercise",
  Post = "post",
  Custom = "custom",
}

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NO_TOKEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_CONTENT = 422,
  INTERNAL_SERVER_ERROR = 500,
}
