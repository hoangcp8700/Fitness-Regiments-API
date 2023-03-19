import { RoleType } from "./roleType";

export type IUser = {
  userName: string;
  password: string;
  email: string;
  fullName?: string;
  nickName?: string;
  phone: string;
  gender?: string;
  avatar?: string;
  coverImage?: string;
  dOB?: string;
  isVerify: boolean;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
};
