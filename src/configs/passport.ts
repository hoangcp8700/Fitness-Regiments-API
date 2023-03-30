/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import GoogleOauth from "passport-google-oauth20";
import FacebookOauth from "passport-facebook";

import { CONFIG } from "@/configs";

export type VerifyCallbackPassPort = (err?: Error | null, user?: any, info?: object) => void;

export type ProfileSocialPassPort = {
  email: string;
  userName?: string;
  fullName: string;
  avatar: {
    url: string;
  };
  providerName: string;
  providerID: string;
  accessToken: string;
};

const passportConnect = () => {
  const GoogleStrategy = GoogleOauth.Strategy;
  const FacebookStrategy = FacebookOauth.Strategy;

  // Middleware
  passport.serializeUser((user, cb) => {
    console.log("serializeUser", user);
    cb(null, user);
  });

  passport.deserializeUser(async (obj: any, cb) => {
    // eslint-disable-next-line no-console
    console.log("deserializeUser", obj);
    cb(null, obj);
  });

  // google
  passport.use(
    new GoogleStrategy.Strategy(
      CONFIG.passport.GOOGLE,
      async (
        accessToken: string,
        _refreshToken: string,
        profile: passport.Profile,
        done: VerifyCallbackPassPort,
      ) => {
        if (profile && profile.emails) {
          const newProfile: ProfileSocialPassPort = {
            ...(profile.username && { username: profile.username }),
            email: profile.emails[0].value,
            avatar: {
              url: (profile?.photos && profile?.photos[0].value) as string,
            },
            fullName: profile.displayName,
            providerName: profile.provider,
            providerID: profile.id,
            accessToken,
          };
          done(null, newProfile);
        }
      },
    ),
  );

  // facebook
  passport.use(
    new FacebookStrategy(
      CONFIG.passport.FACEBOOK,
      async (
        accessToken: string,
        _refreshToken: string,
        profile: FacebookOauth.Profile,
        done: VerifyCallbackPassPort,
      ) => {
        // console.log("facebook", profile);
        // TODO: TEST LATER IF UP STAGING
        if (profile.id) {
          const newProfile: ProfileSocialPassPort = {
            ...(profile.username && { username: profile.username }),
            email: (profile?.emails && profile.emails[0]?.value) as string,
            avatar: {
              url: (profile?.photos && profile.photos[0].value) as string,
            },
            fullName: profile.displayName,
            providerName: profile.provider,
            providerID: profile.id,
            accessToken,
          };
          done(null, newProfile);
        }
      },
    ),
  );
};

export default passportConnect;
