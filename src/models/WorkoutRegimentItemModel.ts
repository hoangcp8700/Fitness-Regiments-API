import { Model, Schema, model, Document } from "mongoose";

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

export const itemIDRequired = (value: any, doc: WorkoutRegimentItemDocument) => {
  return doc.type !== WorkoutItemType.Custom || !!value;
};

export const contentRequired = (value: any, doc: WorkoutRegimentItemDocument) => {
  return doc.type === WorkoutItemType.Custom ? !!value : true;
};

const schema: Schema = new Schema<WorkoutRegimentItemType>(
  {
    workoutID: {
      type: Schema.Types.ObjectId,
      ref: "workoutregiments",
    },
    itemID: {
      type: Schema.Types.ObjectId,
      // refPath: "type", // solution 1
      // solution 2
      refPath() {
        if (this.type === WorkoutItemType.Custom) {
          return "null";
        }

        return this.type;
      },
    },
    positionIndex: Number,
    title: String,
    content: {
      type: String,
      validate: [contentRequired, "customContent is required if type is Custom"],
      default: null,
    },
    type: {
      type: String,
      enum: Object.values(WorkoutItemType),
      required: true,
    },
    color: { type: String, default: null },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

// format data
schema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.workoutID;
    return ret;
  },
});

const WorkoutRegimentItem: WorkoutRegimentItemModel = model<
  WorkoutRegimentItemDocument,
  WorkoutRegimentItemModel
>("WorkoutRegimentItem", schema);

export default WorkoutRegimentItem;
