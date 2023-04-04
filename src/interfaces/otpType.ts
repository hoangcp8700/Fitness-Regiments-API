import { Schema } from "mongoose";

export type OtpType = {
  createdBy: Schema.Types.ObjectId;
  otp: string;
  expired: Date;
  createdAt: Date;
  updatedAt: Date;
};
