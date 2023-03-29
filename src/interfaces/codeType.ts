import { Schema } from "mongoose";

export type CodeType = {
  createdBy: Schema.Types.ObjectId;
  otp: string;
  expired: Date;
  createdAt: Date;
  updatedAt: Date;
};
