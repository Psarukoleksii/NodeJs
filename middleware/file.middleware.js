const {constants, errorHand, codes, messages} = require('../config');


module.exports = {
    checkFileMiddleware: (req, res, next) => {
        try {
            const {files} = req;

            const docs = [];
            const photos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const {size, mimetype} = allFiles[i]

                if (constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (constants.PHOTO_MAX_SIZE < size) {
                        throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.SIZE_IS_TOO_BIG)
                    }

                    photos.push(allFiles[i]);
                } else if (constants.DOCS_MIMETYPES.includes(mimetype)) {
                    if (constants.FILE_MAX_SIZE < size) {
                        throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.SIZE_IS_TOO_BIG)
                    }

                    docs.push(allFiles[i]);
                } else {
                    throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.NOT_VALID_FILE)
                }
            }

            req.docs = docs;
            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next)=> {
        try{
            if(req.photos.length > 1){
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.MANY_PHOTOS);
            }

            [req.avatar] = req.photos;

            next();
        } catch (e) {
            next(e);
        }
    }
};
