import jwt from "jsonwebtoken";

import { CONFIG } from "@/configs";

const parseToken = (token: string) => jwt.verify(token, CONFIG.jwt.secretKey || "");

export const createToken = <T extends object>(data: T) =>
  jwt.sign(data, CONFIG.jwt.secretKey || "", { expiresIn: CONFIG.jwt.expired });

export const createCode = (updatedAt: Date): string => {
  const getTimeStamp = new Date(updatedAt).getTime().toString();
  return getTimeStamp.substring(getTimeStamp.length - 6, getTimeStamp.length);
};

export const verifyCode = (updatedAt: Date, code: string): boolean => {
  const getTimeStamp = new Date(updatedAt).getTime().toString();
  const codeValue = getTimeStamp.substring(getTimeStamp.length - 6, getTimeStamp.length);

  return code === codeValue;
};

export default parseToken;
