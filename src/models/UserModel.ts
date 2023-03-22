import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { IUser } from "@interfaces/userType";
import { RoleType } from "@constants/enum";
import timezone from "@/utils/formatTime";
import { hashPasswordFC } from "@/utils/functions";
import { IPaginateModel } from "@interfaces/paginate";

// declare methods
export interface IUserDocument extends IUser, Document {
  hashPassword: (password: string) => string;
  hiddenPassword(): IUser;
}

// declare  statics
export interface IUserModel extends Model<IUserDocument>, IPaginateModel<IUserDocument> {
  findByUsername: ({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) => Promise<IUserDocument>;
}

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
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

schema.methods.hiddenPassword = function (): IUser {
  const obj = this.toObject(); // or var obj = this;
  delete obj.password;
  return obj;
};

// check authentication
schema.statics.findByUsername = async function ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}): Promise<IUserDocument> {
  return this.findOne({
    $or: [{ email }, { userName }],
  }).select("+password");
};

schema.plugin(mongoosePaginate);

const User = model<IUserDocument, IUserModel>("User", schema);

export default User;
