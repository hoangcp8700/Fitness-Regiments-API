import winston from "winston";

const logging = () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "logging/error.log", level: "error" }),
      new winston.transports.File({ filename: "logging/combined.log", level: "info" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    );
  }
  return logger;
};

export const logger = logging();

export default logging;

// EXAMPLE
// logger.info("Hello again distributed logs");
