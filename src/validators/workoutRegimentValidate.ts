import * as yup from "yup";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";
import { DateType, WorkoutItemType } from "@constants/enum";

const workoutSchema = yup.object().shape({
  title: yup.string().required(),
  slug: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .matches(regex.slug, VALIDATE_MESSAGE.SLUG_INVALID),
  type: yup.mixed<DateType>().oneOf(Object.values(DateType)).required(),
});

// TODO : CHUA CHECK
const workoutItemSchema = yup.object().shape({
  positionIndex: yup.number().required(),
  title: yup.string().required(),
  color: yup.string().optional(),
  itemID: yup.mixed().test("slug", function (value) {
    const { type } = this.parent;
    console.log("validate itemid", value, type);
    if (type !== WorkoutItemType.Custom) {
      return this.schema.required();
    }
    return true;
  }),
  content: yup.mixed().test("slug", function () {
    const { type } = this.parent;
    if (type === WorkoutItemType.Custom) {
      return this.schema.required();
    }
    return true;
  }),
  type: yup.mixed<WorkoutItemType>().oneOf(Object.values(WorkoutItemType)).required(),
});

export default {
  workoutSchema,
  workoutItemSchema,
};
