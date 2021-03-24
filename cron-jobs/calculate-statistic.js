const User = require('../dataBase/models/user');

module.exports = async () => {
    const userCount = await User.countDocuments();
    // console.log(userCount);
};
