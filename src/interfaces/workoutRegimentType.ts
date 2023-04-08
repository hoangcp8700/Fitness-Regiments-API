import { Schema } from "mongoose";

import { DateType, WorkoutItemType } from "@constants/enum";

import { BaseActionType } from "./base";

export type WorkoutRegimentType = {
  createdBy: Schema.Types.ObjectId;
  title: string;
  slug: string;
  type: DateType;
} & BaseActionType;

export type WorkoutRegimentItemType = {
  workoutID: Schema.Types.ObjectId;
  itemID?: Schema.Types.ObjectId; // combine with type below
  type: WorkoutItemType;
  content?: string;
  positionIndex: number;
  title: string;
  color?: string; // hex color
  startTime?: Date;
  endTime?: Date;
};
