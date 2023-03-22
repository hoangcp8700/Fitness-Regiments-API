import { PaginateModel } from "mongoose";

export interface IPaginateModelResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page?: number;
  limit?: number;
  nextPage?: number | null;
  prevPage?: number | null;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
  query?: {
    page?: number;
    limit?: number;
    sort?: string;
  };
}

export type IPaginateModel<T> = PaginateModel<T>;
