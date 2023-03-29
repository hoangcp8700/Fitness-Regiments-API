import jwt from "jsonwebtoken";

import { CONFIG } from "@/configs";

import timezone, { fAddMinute } from "./formatTime";

const parseToken = (token: string) => jwt.verify(token, CONFIG.jwt.secretKey);

export const createToken = <T extends object>(data: T, expiresIn = CONFIG.jwt.expired) =>
  jwt.sign(data, CONFIG.jwt.secretKey || "", { expiresIn });

export const createCode = (expiredTime = 30) => {
  const getTimeStamp = timezone().toString();
  const expired = fAddMinute(expiredTime);

  return {
    code: getTimeStamp.substring(getTimeStamp.length - 6, getTimeStamp.length),
    expired,
  };
};

export default parseToken;
