export type ThumbnailType = {
  id: string;
  url: string;
};
export type BaseActionType = {
  isPublic: boolean;
  countLike?: number;
  countSave?: number;
  countComment?: number;
  countView?: number;
};
