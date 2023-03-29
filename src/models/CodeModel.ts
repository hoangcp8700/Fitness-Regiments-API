import { Model, Schema, model, Document } from "mongoose";

import timezone, { isExpiredTime } from "@/utils/formatTime";
import { CodeType } from "@interfaces/codeType";
import { createCode } from "@utils/jwt";

// declare methods
export interface CodeDocument extends CodeType, Document {
  isExpired: () => boolean;
}

interface CreateOrUpdateCodeProps {
  otp: string;
  expired?: Date;
}
// declare  statics
export interface CodeModel extends Model<CodeDocument> {
  createOrUpdateCode: (userID: string) => Promise<CreateOrUpdateCodeProps>;
}

const schema = new Schema<CodeType>(
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

const Code = model<CodeDocument, CodeModel>("Code", schema);

export default Code;
