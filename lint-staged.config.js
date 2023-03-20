module.exports = {
  // This will check Typescript files
  "src/**/*.(ts|js)": () => "yarn tsc --noEmit",

  // This will lint and format TypeScript and JavaScript files
  "src/**/*.(ts|js|md)": (filenames) => [
    `yarn eslint --fix ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // This will lint and format scss files
};
