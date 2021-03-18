const User = require('../dataBase/models/user');
const {passwordHasher, tokenizer} = require('../helpers');
const O_Auth = require('../dataBase/models/O_Auth');
const { messages } = require('../config')

module.exports = {
    authUser: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new Error(messages.errorMessages.USER_IS_NOT_FIND);
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await O_Auth.create({...tokens, _user_id: user._id});

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
}
