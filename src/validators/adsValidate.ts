import * as yup from "yup";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";

const adsSchema = yup.object().shape({
  email: yup.string().required(),
  phone: yup.string().required(),
  price: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().optional(),
  videoUrl: yup.string().optional().matches(regex.youtubeRegex, VALIDATE_MESSAGE.SLUG_INVALID),
  startTime: yup.date().required(),
  endTime: yup.date().required(),
});

const adsUpdateSchema = yup.object().shape({
  email: yup.string().optional(),
  phone: yup.string().optional(),
  price: yup.string().optional(),
  title: yup.string().optional(),
  description: yup.string().optional(),
  videoUrl: yup.string().optional().matches(regex.youtubeRegex, VALIDATE_MESSAGE.SLUG_INVALID),
  startTime: yup.date().optional(),
  endTime: yup.date().optional(),
});

export default {
  adsSchema,
  adsUpdateSchema,
};
