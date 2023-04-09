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
    IPaginateModel<WorkoutRegimentDocument> {
  // aggregatePaginate(
  //   query?: Aggregate<WorkoutRegimentDocument[]>,
  //   options?: PaginateOptions,
  //   callback?: (err: any, result: AggregatePaginateResult<WorkoutRegimentDocument>) => void,
  // ): Promise<AggregatePaginateResult<WorkoutRegimentDocument>>;
}

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

// schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);

const WorkoutRegiment: WorkoutRegimentModel = model<WorkoutRegimentDocument, WorkoutRegimentModel>(
  "WorkoutRegiment",
  schema,
);

export default WorkoutRegiment;

// EXAMPLE
//  const options = paginateOptions({ page, limit });
// const aggregate = WorkoutRegiment.aggregate(aggregatePipeline);
// const response = await WorkoutRegiment.aggregatePaginate(aggregate, options);
