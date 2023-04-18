import os from "os";

import express from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const router = express.Router();

const PORT = process.env.PORT || "5000";
const HOST = process.env.HOST || os.hostname();
const SECRET_KEY = process.env.SECRET_KEY as string;
const { URL_CLIENT, URL_SERVER } = process.env;

const CORS_OPTIONS = {
  origin: "*",
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
const HASH_PASSWORD_OPTIONS = {
  length: 10,
  key: "s0//P4$$w0rD",
};

const JWT_OPTIONS = {
  secretKey: SECRET_KEY,
  expired: "1h",
  refresh: "1y",
};

const MONGOOSE_OPTIONS = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zkxzpff.mongodb.net/?retryWrites=true&w=majority`;

const SMTP_OTHER = {
  from: process.env.SMTP_FROM,
};

const SMTP_AUTH_INFO = {
  type: "OAuth2",
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD,
  clientId: process.env.SMTP_CLIENT_ID,
  clientSecret: process.env.SMTP_CLIENT_SECRET,
  refreshToken: process.env.SMTP_REFRESH_TOKEN,
};

const SMTP_INITIALIZE_OPTIONS = (accessToken: string) => ({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    ...SMTP_AUTH_INFO,
    accessToken,
  },
});

const CLOUDINARY_OPTIONS = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
};

// schema options
const VALIDATE_SCHEMA_OPTIONS = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const PASSPORT_OPTIONS = {
  GOOGLE: {
    // callbackURL: `${process.env.URI_CLIENT}/auth/google/callback`,
    callbackURL: `${process.env.URI_SERVER}/auth/google/callback`,
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorizationURL: "", // ??
    tokenURL: "", // ??
  },
  GITHUB: {
    // callbackURL: `${process.env.URI_CLIENT}/auth/github/callback`,
    callbackURL: `${process.env.URI_SERVER}/auth/github/callback`,
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  FACEBOOK: {
    // callbackURL: `${process.env.URI_CLIENT}/auth/facebook/callback`,
    callbackURL: `${process.env.URI_SERVER}/auth/facebook/callback`,
    clientID: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    profileFields: [
      "id",
      "displayName",
      "name",
      "email",
      "birthday",
      "gender",
      "picture.type(large)",
    ],
  },
};

// Array of allowed files
const imgExtensions = ["png", "jpeg", "jpg"];
const videoExtension = ["mp4", "mov", "webm"];

export const CONFIG = {
  port: PORT,
  host: HOST,
  urlClient: URL_CLIENT,
  mongoose: MONGOOSE_OPTIONS,
  accessTokenExpiresIn: 15,
  corsOptions: CORS_OPTIONS,
  hashPassword: HASH_PASSWORD_OPTIONS,
  jwt: JWT_OPTIONS,
  smtp: SMTP_INITIALIZE_OPTIONS,
  smtpAuthInfo: SMTP_AUTH_INFO,
  smtpOther: SMTP_OTHER,
  cloudinary: CLOUDINARY_OPTIONS,
  urlServer: URL_SERVER,
  schemaValidateOptions: VALIDATE_SCHEMA_OPTIONS,
  passport: PASSPORT_OPTIONS,
  secretKey: SECRET_KEY,
  imgExtensions,
  videoExtension,
};
