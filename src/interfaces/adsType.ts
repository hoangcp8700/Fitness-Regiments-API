import { ThumbnailType } from "./base";

export type AdsType = {
  email: string;
  phone: string;
  price: string;
  title: string;
  description?: string;
  thumbnail?: ThumbnailType;
  videoUrl?: string;
  isPublic: boolean;
  startTime: Date;
  endTime: Date;
  isPaid: boolean;
};
