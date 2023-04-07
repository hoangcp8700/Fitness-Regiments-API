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
      validate: [itemIDRequired, "itemID is required if type is not Custom"],
      // refPath: "type", // solution 1
      refPath() {
        if (this.type === WorkoutItemType.Custom) {
          return "null";
        }

        return this.type;
      }, // solution 2
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
    color: String,
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

schema.pre<WorkoutRegimentItemDocument>("save", function (next) {
  if (this.type !== WorkoutItemType.Custom) {
    this.content = ""; // clear the customContent field if type is not Custom
  }
  next();
});

schema.plugin(mongoosePaginate);

const WorkoutRegimentItem: WorkoutRegimentItemModel = model<
  WorkoutRegimentItemDocument,
  WorkoutRegimentItemModel
>("WorkoutRegimentItem", schema);

export default WorkoutRegimentItem;
