import type { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';
import multer from 'multer';

type FileMiddlewareOptions = {
  uploadPath: string;
  /** In MB */
  maxFileSize?: number;
};

function getUploadMiddleware(
  dest: string | null,
  acceptedMimeTypes?: string[]
) {
  if (!dest)
    return multer({
      storage: multer.memoryStorage(),
    }).any(); // No upload path provided, skip file upload

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Default to 20MB
    fileFilter: (req, file, cb) => {
      if (acceptedMimeTypes && !acceptedMimeTypes.includes(file.mimetype)) {
        return cb(new HttpException(400, 'invalid_mime_type'));
      }
      cb(null, true);
    },
  }).any();
}

export function createFileMiddleware(options: {
  uploadPath: string;
  maxFileSize?: number;
  acceptedMimeTypes?: string[];
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const MB = 1024 * 1024;
      const maxFileSize = (options?.maxFileSize || 20) * MB; // Default to 20MB
      const uploadPath = options?.uploadPath;
      const acceptedMimeTypes = options?.acceptedMimeTypes;
      const upload = getUploadMiddleware(uploadPath, acceptedMimeTypes);

      upload(req, res, err => {
        if (err) return next(new HttpException(500, 'upload_error'));

        if (!req?.file?.size && !Object.keys(req?.files || {}).length)
          return next();

        if (req?.file && req.file.size > maxFileSize)
          return next(new HttpException(400, 'file_too_large'));

        return next();
      });
    } catch (error) {
      console.error('upload_error:', error);
      return next(new Error('internal'));
    }
  };
}
