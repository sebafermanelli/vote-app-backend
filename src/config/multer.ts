import multer from 'multer';
import path from 'path';

const userImageStorage = multer.diskStorage({
	destination: path.join(__dirname, '../../static/images/users'),
	filename: (req, file, cb) => {
		cb(null, `${req.body.id}.${file.mimetype.split('/')[1]}`);
	},
});
export const userFileUpload = multer({ storage: userImageStorage }).single('image');

const listImageStorage = multer.diskStorage({
	destination: path.join(__dirname, '../../static/images/lists'),
	filename: (req, file, cb) => {
		cb(null, `${req.body.id}.${file.mimetype.split('/')[1]}`);
	},
});
export const listFileUpload = multer({ storage: listImageStorage }).single('image');
