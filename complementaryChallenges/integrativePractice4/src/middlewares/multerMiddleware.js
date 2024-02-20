/* import multer from 'multer';
import fs from 'fs';
import { __dirname } from '../utilities.js'; */

/* const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const folderPath = path.join(__dirname, '../public/img');
    console.log('folderPath', folderPath);
    callback(null, folderPath);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
}); */

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file midd', file);
    let folderPath = null;
    switch (file.fieldname) {
      case 'profileImg':
        folderPath = path.resolve(__dirname, '..','library', 'profiles');
        break;
      case 'productsImg':
        folderPath = path.resolve(__dirname, '..','library', 'products');
        break;
      case 'documents':
        folderPath = path.join(__dirname, './library/documents');
        break;
      default:
        folderPath = path.resolve(__dirname, '..','..','public','library');
        
    }
    console.log('folderPath', folderPath);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const { user: { id } } = req;
    cb(null, `${id}-${file.originalname}`);
  },
});

export const uploader = multer({ storage }); */