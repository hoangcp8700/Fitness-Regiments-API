import * as yup from "yup";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";

const exerciseSchema = yup.object().shape({
  categoryID: yup.string().required(),
  videoUrl: yup.string().required().matches(regex.youtubeRegex, VALIDATE_MESSAGE.SLUG_INVALID),
  duration: yup.number().required(),
  name: yup.string().required(),
  slug: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .matches(regex.slug, VALIDATE_MESSAGE.SLUG_INVALID),
});

const exerciseUpdateSchema = yup.object().shape({
  listPublicID: yup.array().optional(),
  categoryID: yup.string().optional(),
  videoUrl: yup.string().optional().matches(regex.youtubeRegex, VALIDATE_MESSAGE.SLUG_INVALID),
  duration: yup.number().optional(),
  name: yup.string().optional(),
  slug: yup
    .string()
    .optional()
    .trim()
    .lowercase()
    .matches(regex.slug, VALIDATE_MESSAGE.SLUG_INVALID),
});

export default {
  exerciseSchema,
  exerciseUpdateSchema,
};
