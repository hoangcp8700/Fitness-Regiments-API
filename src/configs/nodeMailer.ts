import SMTPTransport from "nodemailer/lib/smtp-transport";
import { OAuth2Client } from "google-auth-library";
import nodemailer, { SendMailOptions } from "nodemailer";

import { CONFIG } from "@configs";

const config = (myAccessToken: string) => {
  const options = {
    service: "gmail",
    auth: {
      ...CONFIG.smtpAuthInfo,
      accessToken: myAccessToken,
    },
  };
  return nodemailer.createTransport(options as SMTPTransport.Options);
};

const nodeMailerConfig = async (mailOptions: SendMailOptions) => {
  try {
    const myOAuth2Client = new OAuth2Client(
      CONFIG.smtpAuthInfo.clientId,
      CONFIG.smtpAuthInfo.clientSecret,
    );

    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: CONFIG.smtpAuthInfo.refresh_token,
    });

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;

    const transport = config(myAccessToken || "");

    return await transport.sendMail({
      from: CONFIG.smtpOther.from,
      ...mailOptions,
    });
  } catch (error) {
    return error;
  }
};

export default nodeMailerConfig;
