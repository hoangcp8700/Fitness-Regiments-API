import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import timezone from "@/utils/formatTime";
import { IPaginateModel } from "@interfaces/paginate";
import { WorkoutRegimentType } from "@/interfaces/workoutRegimentType";
import { DateType } from "@constants/enum";

// declare methods
export interface WorkoutRegimentDocument extends WorkoutRegimentType, Document {}

// declare  statics
export interface WorkoutRegimentModel
  extends Model<WorkoutRegimentDocument>,
    IPaginateModel<WorkoutRegimentDocument> {}

const schema: Schema = new Schema<WorkoutRegimentType>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    title: String,
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(DateType),
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

// schema.post("remove", async (result, next) => {
//   await SubCategory.deleteMany({
//     categoryID: result._id,
//   }).exec();
//   await Product.deleteMany({ categoryID: result._id }).exec();

//   next();
// });

schema.plugin(mongoosePaginate);

const WorkoutRegiment: WorkoutRegimentModel = model<WorkoutRegimentDocument, WorkoutRegimentModel>(
  "WorkoutRegiment",
  schema,
);

export default WorkoutRegiment;
