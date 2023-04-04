import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import timezone from "@/utils/formatTime";
import { ExerciseType } from "@/interfaces/exerciseType";
import { IPaginateModel } from "@interfaces/paginate";

// declare methods
export interface ExerciseDocument extends ExerciseType, Document {}

// declare  statics
export interface ExerciseModel extends Model<ExerciseDocument>, IPaginateModel<ExerciseDocument> {}

const schema: Schema = new Schema<ExerciseType>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    videoUrl: String,
    duration: Number,
    content: String,
    images: [
      {
        _id: false,
        id: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

// // format data
// schema.set("toJSON", {
//   transform(_doc, ret) {
//     ret.thumbnail = ret.thumbnail.url; // set thumbnail to the URL string
//     return ret;
//   },
// });

schema.plugin(mongoosePaginate);

const Exercise: ExerciseModel = model<ExerciseDocument, ExerciseModel>("Exercise", schema);

export default Exercise;
