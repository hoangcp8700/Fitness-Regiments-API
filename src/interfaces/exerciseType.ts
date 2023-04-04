import { Schema } from "mongoose";

import { BaseActionType, ThumbnailType } from "./base";

export type ExerciseType = {
  createdBy?: Schema.Types.ObjectId;
  categoryID?: Schema.Types.ObjectId;
  name: string;
  slug: string;
  videoUrl: string;
  duration: number;
  content: string;
  images?: ThumbnailType[];
} & BaseActionType;
