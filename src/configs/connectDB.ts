/* eslint-disable no-console */

import mongoose from "mongoose";

import { CONFIG } from "@/configs";
import MESSAGES from "@constants/messages";

const connectDB = () =>
  mongoose
    .connect(CONFIG.mongoose, {
      retryWrites: true,
      w: "majority",
    })
    .then(() => console.log("Connected Database Successfully"))
    .catch((err) => {
      console.error(MESSAGES.CONNECT_DB_ERROR, err);
      process.exit();
    });

export default connectDB;
