// middlewares/multerMiddleware.js
import multer from "multer";
import path from 'path'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    let filename = file.originalname;
    if (req.all_files) {
      req.all_files[file.fieldname] = filename
      req.all_files['original_name'] = file.originalname
    } else {
      req.all_files = {}
      req.all_files[file.fieldname] = filename
      req.all_files['original_name'] = file.originalname
    }
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||  file.mimetype === 'image/jpg'||  file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploadProductPhoto = multer({ storage: fileStorage, limits: { fileSize: '1mb' }, fileFilter: fileFilter }).fields([
  {
    name: 'photo',
    maxCount: 5
  }
]);

export default uploadProductPhoto;

