import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import timezone from "@/utils/formatTime";
import { AdsType } from "@/interfaces/adsType";
import { IPaginateModel } from "@interfaces/paginate";

// declare methods
export interface AdsDocument extends AdsType, Document {}

// declare  statics
export interface AdsModel extends Model<AdsDocument>, IPaginateModel<AdsDocument> {}

const schema: Schema = new Schema<AdsType>(
  {
    phone: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    title: String,
    description: String,
    price: String,
    videoUrl: String,
    thumbnail: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    startTime: Date,
    endTime: Date,
    isPaid: Boolean,
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { currentTime: () => timezone() },
  },
);

// format data
schema.set("toJSON", {
  transform(_doc, ret) {
    ret.thumbnail = ret.thumbnail.url; // set thumbnail to the URL string
    return ret;
  },
});

schema.plugin(mongoosePaginate);

const Ads: AdsModel = model<AdsDocument, AdsModel>("Ads", schema);

export default Ads;
