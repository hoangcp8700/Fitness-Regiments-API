import { Model, Schema, model, Document } from "mongoose";

import { IUser } from "@interfaces/userType";
import { RoleType } from "@constants/enum";
import timezone from "@/utils/formatTime";
import { comparePasswordFC, hashPasswordFC } from "@/utils/functions";

// declare methods
export interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => boolean;
  hashPassword: (password: string) => string;
  getFullName(): string;
  hiddenPassword(): IUser;
}

// declare  statics
export interface IUserModel extends Model<IUserDocument> {
  findByUsername: ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) => Promise<IUserDocument>;
}

const schema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    userName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    nickName: String,
    fullName: String,
    phone: String,
    gender: String,
    avatar: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    coverImage: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },

    dOB: Date,
    isVerify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: RoleType.User,
    },
  },
  { timestamps: { currentTime: () => timezone() } },
);

schema.pre<IUser>("save", function (next) {
  if (this.password) {
    this.password = hashPasswordFC(this.password);
  }
  next();
});

schema.methods.comparePassword = function (password: string): boolean {
  return comparePasswordFC(this.password, password);
};

schema.methods.hashPassword = function (password: string): string {
  return hashPasswordFC(password);
};

schema.methods.hiddenPassword = function (): IUser {
  const obj = this.toObject(); // or var obj = this;
  delete obj.password;
  return obj;
};

schema.statics.findByUsername = async function ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}): Promise<IUserDocument> {
  return this.findOne({
    $or: [{ email: { $in: [email] } }, { userName: { $in: [userName] } }],
  }).select("+password");
};

const User: IUserModel = model<IUserDocument, IUserModel>("User", schema);

export default User;
