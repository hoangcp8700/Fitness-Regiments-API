/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ICategoryDocument } from "@/services/category/model";
// import { IShopDocument } from "@/services/shop/model";
// import { ISubCategoryDocument } from "@/services/subCategory/model";
import { IUserDocument } from "@/models/UserModel";

declare global {
  namespace Express {
    interface AuthInfo {}
    // tslint:disable-next-line:no-empty-interface
    interface User extends IUserDocument {}

    interface Request {
      userID?: string;
      // category?: ICategoryDocument | any;
      // subCategory?: ISubCategoryDocument | any;
      // userInfo?: User | any;
      // user?: User | undefined;
      // shop?: IShopDocument | undefined;
      isAdmin?: boolean;
    }
  }
}
