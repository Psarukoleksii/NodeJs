const Token = require('../dataBase/models/O_Auth');
const { constants } = require('../config')

module.exports = async () => {
    const tokens = await Token.find();

    tokens.map( async (value) => {
        const retdate = new Date();
        retdate.setDate(retdate.getDate() - 7)
        const tokenDate = new Date(value.createdAt);
        const difference = retdate - tokenDate;

        if (Math.floor(difference / constants.TOTAL_MILLISECONDS_IN_A_WEEK) <= 7) {
            await Token.deleteOne({_id: value._id})
        }
    });
}
