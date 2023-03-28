import cloudinaryOrigin, { UploadApiOptions } from "cloudinary";
import sharp from "sharp";

import { datauriFormat } from "@/utils/functions";
import { ThumbnailType } from "@interfaces/base";

import { CONFIG } from ".";

const cloudinary = cloudinaryOrigin.v2;

cloudinary.config(CONFIG.cloudinary);

export type FileMulter = Express.Multer.File;

export type FileResult = ThumbnailType;

const upload = async (fileName?: string, options?: UploadApiOptions) => {
  try {
    if (fileName) {
      const result = await cloudinary.uploader.upload(fileName, options);
      return { id: result.public_id, url: result.secure_url };
    }
    return undefined;
  } catch (error) {
    throw new Error("Error");
  }
};

export const cloudinaryUploadSingle = async (file: FileMulter, options?: UploadApiOptions) => {
  try {
    const resizeImageToBuffer = await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 10 })
      .toBuffer();

    const base64 = datauriFormat(resizeImageToBuffer);
    return await upload(base64.content, options);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const cloudinaryUploadMultiple = async (files: FileMulter[], options: UploadApiOptions) => {
  try {
    const imageList: FileResult[] = [];

    const multiplePicturePromise = files.map(async (file: FileMulter): Promise<void> => {
      const fileValue = await cloudinaryUploadSingle(file, options);
      fileValue && imageList.push({ id: fileValue.id, url: fileValue.url });
    });

    return await Promise.all(multiplePicturePromise).then(() => imageList);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const cloudinaryDestroy = async (publicID: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicID);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const cloudinaryDestroyMultiple = async (listPublicID: string[]): Promise<void> => {
  try {
    listPublicID.forEach(async (publicID: string): Promise<void> => {
      await cloudinary.uploader.destroy(publicID);
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default cloudinary;
