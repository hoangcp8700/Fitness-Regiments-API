import * as yup from "yup";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";
import { DateType } from "@constants/enum";

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

export default {
  workoutSchema,
};
