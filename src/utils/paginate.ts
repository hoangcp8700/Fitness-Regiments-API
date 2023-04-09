import { PaginateOptions } from "mongoose";

export interface PaginateOptionsDefaultProps extends PaginateOptions {
  page: any;
  limit: any;
}

export const paginateOptions = (params: PaginateOptionsDefaultProps) => {
  const { page = 1, limit = 20, ...rest } = params;

  return {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    ...rest,
  };
};
