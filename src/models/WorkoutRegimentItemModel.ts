import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import timezone from "@/utils/formatTime";
import { IPaginateModel } from "@interfaces/paginate";
import { WorkoutRegimentItemType } from "@/interfaces/workoutRegimentType";
import { WorkoutItemType } from "@constants/enum";

// declare methods
export interface WorkoutRegimentItemDocument extends WorkoutRegimentItemType, Document {}

// declare  statics
export interface WorkoutRegimentItemModel
  extends Model<WorkoutRegimentItemDocument>,
    IPaginateModel<WorkoutRegimentItemDocument> {}

const schema: Schema = new Schema<WorkoutRegimentItemType>(
  {
    workoutID: {
      type: Schema.Types.ObjectId,
      ref: "workoutregiments",
    },
    positionIndex: Number,
    title: String,
    content: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: Object.values(WorkoutItemType),
    },
    color: String,
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

schema.plugin(mongoosePaginate);

const WorkoutRegimentItem: WorkoutRegimentItemModel = model<
  WorkoutRegimentItemDocument,
  WorkoutRegimentItemModel
>("WorkoutRegimentItem", schema);

export default WorkoutRegimentItem;
