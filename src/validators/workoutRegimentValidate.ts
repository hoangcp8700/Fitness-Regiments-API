import * as yup from "yup";
import { isEqual } from "date-fns";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";
import { DateType, WorkoutItemType } from "@constants/enum";
import { defaultDate } from "@constants/variables";
import timezone from "@utils/formatTime";

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

  startTime: yup
    .date()
    .nullable()
    .default(() => new Date(timezone(defaultDate))),

  endTime: yup.date().when("startTime", (eventStartDate, schema) => {
    // eslint-disable-next-line no-restricted-globals
    if (!eventStartDate || isNaN(eventStartDate[0].getTime())) {
      return schema;
    }
    const date1 = eventStartDate[0];
    const date2 = new Date(timezone(defaultDate));

    if (isEqual(date1, date2)) {
      return schema;
    }

    return schema.required().min(eventStartDate, VALIDATE_MESSAGE.DATE_RANGE_END);
  }),
});

export default {
  workoutSchema,
  workoutItemSchema,
};
