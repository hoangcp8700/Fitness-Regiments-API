import * as yup from "yup";

import { VALIDATE_MESSAGE } from "@constants/messages";
import regex from "@utils/regex";

const categorySchema = yup.object().shape({
  name: yup.string().test("name", VALIDATE_MESSAGE.NAME_COMBINE_SLUG, function (value) {
    const { slug } = this.parent;
    if (slug && slug.length > 0) {
      return !!value;
    }
    return true;
  }),
  slug: yup
    .string()
    .test("slug", VALIDATE_MESSAGE.SLUG_COMBINE_NAME, function (value) {
      const { name } = this.parent;
      if (name && name.length > 0) {
        return !!value;
      }
      return true;
    })
    .trim()
    .lowercase()
    .matches(regex.slug, VALIDATE_MESSAGE.SLUG_INVALID),
});

export default {
  categorySchema,
};
