const ROUTES_CONSTANTS = {
  RESET_PASSWORD: "reset-password",
  OAUTH: {
    GOOGLE: {
      SUCCESS: `${process.env.URI_CLIENT}/oauth/google/success`,
      FAILED: `${process.env.URI_CLIENT}/oauth/google/failed`,
    },
    FACEBOOK: {
      SUCCESS: `${process.env.URI_CLIENT}/oauth/facebook/success`,
      FAILED: `${process.env.URI_CLIENT}/oauth/facebook/failed`,
    },
  },
};
export default ROUTES_CONSTANTS;
