const MESSAGES = {
  // SYSTEM
  SERVER_ERROR: "Something went wrong with the server",
  ROUTER_NOT_EXIST: "Route not exist",
  NO_TOKEN_PROVIDE: "No token provided",
  UNAUTHORIZED: "Unauthorized",
  CONNECT_DB_ERROR: "Connect to database error",
  NO_PERMISSION: "No permission to access",

  // AUTH
  LOGOUT_SUCCESS: "Logout account success",
  USER_NOT_EXIST: "Account not exist",
  REGISTER_SUCCESS: "Register account success",
  UPDATE_USER_SUCCESS: "Update user successful",
  UPDATE_AVATAR_SUCCESS: "Update avatar successful",
  DELETE_USER_SUCCESS: "Delete user successful",
  LOGIN_SUCCESS: "Login successful",
  VERIFY_ERROR: "Inactive account or unauthorized",
  PASSWORD_INVALID: "Password invalid, please try again",
  RESET_PASSWORD_SUCCESS: "Reset password success",
  CHANGE_PASSWORD_SUCCESS: "Change password success",
  FORGOT_PASSWORD_SUCCESS: "Please check your email to confirm your password",
  ACCOUNT_EXIST: "Email or Username already exists",
  CODE_INVALID: "Code invalid",
  CODE_EXPIRED: "Code expired",

  // CATEGORY
  CATEGORY_NOT_EXIST: "Category not found",
  NAME_SLUG_CATEGORY_EXIST: "Name or slug of category exist",
  CREATE_CATEGORY_SUCCESS: "Create category successfully",
  UPDATE_CATEGORY_SUCCESS: "Update category successfully",
  DELETE_CATEGORY_SUCCESS: "Delete category successfully",
};

export const VALIDATE_MESSAGE = {
  FILE_REQUIRED: "File required",
  INVALID_FILE: (extensions: string) =>
    `Invalid file. Only ${extensions} extensions files are allowed`,
  FILE_TOO_LARGE: "File exceeds maximum",

  // category
  CATEGORY_NAME_COMBINE_SLUG: "Name is required when slug is present",
  CATEGORY_SLUG_COMBINE_NAME: "Slug is required when name is present",
  CATEGORY_SLUG_INVALID: "Invalid slug",
};

export default MESSAGES;
