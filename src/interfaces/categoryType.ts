import { Schema } from "mongoose";

import { RoleCategoryType } from "@constants/enum";

import { ThumbnailType } from "./base";

export type CategoryType = {
  createdBy?: Schema.Types.ObjectId; // default: by isAdmin, other: by User
  name: string;
  slug: string;
  thumbnail?: ThumbnailType;
  isPublic: boolean;
  role: RoleCategoryType;
};
