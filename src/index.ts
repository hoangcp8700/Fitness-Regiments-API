import { createServer } from "./server";
import { CONFIG } from "@configs";
import http from "http";
import { AddressInfo } from "net";
import { AppError, HttpCode } from "@services/AppError";
import MESSAGES from "@constants/messages";

const host = CONFIG.host;
const port = CONFIG.port;

const startServer = async () => {
  try {
    const app = await createServer();
    const server = http.createServer(app).listen({ host, port }, () => {
      const addressInfo = server.address() as AddressInfo;
      console.log(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
    });
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: MESSAGES.SERVER_ERROR,
    });
  }
};

startServer();
