import { Model, Schema, model, Document } from "mongoose";

import timezone, { isExpiredTime } from "@/utils/formatTime";
import { OtpType } from "@interfaces/otpType";
import { createCode } from "@utils/jwt";

// declare methods
export interface OtpDocument extends OtpType, Document {
  isExpired: () => boolean;
}

interface CreateOrUpdateCodeProps {
  otp: string;
  expired?: Date;
}
// declare  statics
export interface CodeModel extends Model<OtpDocument> {
  createOrUpdateCode: (userID: string) => Promise<CreateOrUpdateCodeProps>;
}

const schema = new Schema<OtpType>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    otp: String,
    expired: Date,
  },
  { timestamps: { currentTime: () => timezone() } },
);

schema.statics.createOrUpdateCode = async function (
  userID: string,
): Promise<CreateOrUpdateCodeProps> {
  const response = await this.findOne({ createdBy: userID });

  const { code, expired } = createCode();

  if (!response) {
    await new this({ createdBy: userID, otp: code, expired }).save();
  } else {
    await response.updateOne({ otp: code, expired });
  }

  return {
    otp: code,
    expired,
  };
};

schema.methods.isExpired = function (): boolean {
  return isExpiredTime(this.expired);
};

const Otp = model<OtpDocument, CodeModel>("Otp", schema);

export default Otp;
