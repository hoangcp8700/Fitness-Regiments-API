import http from "http";
import { AddressInfo } from "net";

import { CONFIG } from "@configs";
import { AppError } from "@exceptions/AppError";
import MESSAGES from "@constants/messages";
import { HttpCode } from "@constants/enum";
import { createServer, libConfig } from "@/configs/server";
import connectDB from "@configs/connectDB";

const { host, port } = CONFIG;

const startServer = async () => {
  try {
    const app = await createServer();
    await connectDB().then(() => libConfig());

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
