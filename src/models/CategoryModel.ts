import { Model, Schema, model, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import timezone from "@/utils/formatTime";
import { CategoryType } from "@/interfaces/categoryType";
import { IPaginateModel } from "@interfaces/paginate";
import { RoleCategoryType } from "@constants/enum";

// declare methods
export interface CategoryDocument extends CategoryType, Document {}

// declare  statics
export interface CategoryModel extends Model<CategoryDocument>, IPaginateModel<CategoryDocument> {}

const schema: Schema = new Schema<CategoryType>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
    isPublic: {
      type: Boolean,
      default: true,
    },
    thumbnail: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    role: {
      type: String,
      default: RoleCategoryType.All,
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

// format data
schema.set("toJSON", {
  transform(_doc, ret) {
    ret.thumbnail = ret.thumbnail.url; // set thumbnail to the URL string
    return ret;
  },
});

schema.plugin(mongoosePaginate);

const Category: CategoryModel = model<CategoryDocument, CategoryModel>("Category", schema);

export default Category;
