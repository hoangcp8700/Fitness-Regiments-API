import multer from "multer";

const fileStorage = multer.memoryStorage();

// const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//   if (!file) {
//     return cb(null, false);
//   }

//   const fileName = file.originalname.toLowerCase();
//   if (!fileName.match(/\.(jpg|jpeg|png|svg)$/)) {
//     return cb(new Error("Invalid file type. Only jpg, jpeg png and svg image files are allowed."));
//   }

//   return cb(null, true);
// };

const MULTER = multer({
  storage: fileStorage,
  // fileFilter,
  // limits: { fileSize: (4 / 1000) * 1024 }, // 2mb
  limits: { fileSize: 50000000 }, // 2mb
});

export default MULTER;
