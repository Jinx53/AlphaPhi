const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, 'alphaphi-' + new Date().toString());
    }
});

const acceptedType = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
const fileFilter = (res, file, cb) => {
    acceptedType.some(type => type === file.mimetype) 
    ? cb(null, true)
    : cb(new Error('Wrong file type'), false);
}


const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 7
    }, fileFilter: fileFilter
});

module.exports = upload;