import multer from 'multer';
import createHttpError from 'http-errors';
import logger from '../logger';

export const uploadImg = (req, res, next) => {
  const storage = multer.diskStorage({
    // eslint-disable-next-line no-shadow
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    // eslint-disable-next-line no-shadow
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${file.originalname.match(/\..*$/)[0]}`
      );
    },
  });
  const multiUpload = multer({
    storage,
    // eslint-disable-next-line no-shadow
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error('Only .jpg .jpeg .png images are supported!');
        err.name = 'ExtensionError';
        cb(err);
      }
    },
  }).array('uploadImages', 10);

  multiUpload(req, res, err => {
    if (err instanceof multer.MulterError || err) {
      logger.info('UPLOD-Error: ', err.field);
      throw createHttpError(400, { message: err.message });
    }
    next();
  });
};
