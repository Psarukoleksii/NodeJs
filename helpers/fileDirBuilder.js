const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    fileDirBuilder : (fileName, itemType, itemId) => {

        const pathWithoutStatic = path.join('user', `${itemId}`, `${itemType}`);
        const fileDir = path.join(process.cwd(), 'static', pathWithoutStatic);
        const fileExtension = fileName.name.split('.').pop();
        const finalFileName = `${uuid()}.${fileExtension}`;
        const finalFilePath = path.join(fileDir, finalFileName);

        const uploadPath = path.join(pathWithoutStatic, finalFileName);

        return {finalFilePath, uploadPath, fileDir};
    }
}

