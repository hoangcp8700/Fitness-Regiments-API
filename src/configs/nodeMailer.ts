import { OAuth2Client } from "google-auth-library";
import nodemailer, { SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { CONFIG } from "@configs";
import { AppError } from "@exceptions/AppError";
import { HttpCode } from "@constants/enum";

const config = (accessToken: string) => {
  const options = CONFIG.smtp(accessToken);
  return nodemailer.createTransport(options as SMTPTransport.Options);
};

const nodeMailerConfig = async (mailOptions: SendMailOptions) => {
  try {
    const myOAuth2Client = new OAuth2Client(
      CONFIG.smtpAuthInfo.clientId,
      CONFIG.smtpAuthInfo.clientSecret,
      CONFIG.urlClient,
    );

    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: CONFIG.smtpAuthInfo.refreshToken,
    });

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    const transport = config(myAccessToken || "");

    return await transport.sendMail({
      from: CONFIG.smtpOther.from,
      ...mailOptions,
    });
  } catch (error: any) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: error.message,
    });
  }
};

export default nodeMailerConfig;
