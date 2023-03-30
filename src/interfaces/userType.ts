import { RoleType } from "@constants/enum";

import { ThumbnailType } from "./base";

export type IUser = {
  userName: string;
  password: string;
  email: string;
  fullName?: string;
  nickName?: string;
  phone: string;
  gender?: string;
  avatar?: ThumbnailType;
  coverImage?: ThumbnailType;
  dOB?: string;
  isVerify: boolean;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
  socials?: {
    providerName: string;
    providerID: string;
  }[];
};
