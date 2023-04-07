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

const workoutItemSchema = yup.object().shape({
  positionIndex: yup.number().required(),
  title: yup.string().required(),
  color: yup.string().optional(),
  type: yup.mixed<WorkoutItemType>().oneOf(Object.values(WorkoutItemType)).required(),
  itemID: yup.string().when("type", (value, schema) => {
    if (value[0] !== WorkoutItemType.Custom) return schema.required();
    return schema;
  }),
  content: yup.string().when("type", (value, schema) => {
    if (value[0] === WorkoutItemType.Custom) return schema.required();
    return schema;
  }),
});

export default {
  workoutSchema,
  workoutItemSchema,
};
