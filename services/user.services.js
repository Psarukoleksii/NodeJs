const User = require('../dataBase/models/user');

module.exports = {
    allUsers: () => User.find(),

    // ...?ageGte=20&ageLte=30&name=oleksii -> my URL

    filterUsers: async (query = {}) => {

        const filterObject = {};
        const {limit = 10, page = 1, ...filters} = query; // here we get ageGte, ageLte
        const skip = (page - 1) * limit;
        const keys = Object.keys(filters);  // get all keys of query params [ageGte, ageLte]

        // sorting ======================

        // const {limit = 10, page = 1, sortByd = 'createAt', order = 'asc', ...filters} = query;

        // const orderBy = order === 'asc' ? -1 : 1;

        // const sort = { [sortBy]: orderBy };

        // User.find(filterObject).skip(skip).limit(limit).sort(sort);

        // sorting ======================
        keys.forEach(key => {
            switch (key) {
                case 'ageGte': {
                    filterObject.age = Object.assign({}, filterObject.age, {$gte: +filters.ageGte});
                    break;
                } case 'ageLte': {
                    filterObject.age = Object.assign({}, filterObject.age, {$lte: +filters.ageLte});
                    break;
                } case 'name': {
                    filterObject.name = { $regex: filters.name, $options: 'i' }
                    // search by name, autocomplete
                    // options i => mongo DB is key sensitive, but when we write 'i', we are ignore this
                    break;
                } default: {
                    filterObject[key] = filters[key];
                }
            }
        })

        const users = await User.find(filterObject);
        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit,
            count
        }
    },

    userById: (userId) => User.findById(userId),

    createUser: (objUser) => User.create(objUser),

    updateUserById: (userId, updateObject) => User.updateOne({_id: userId}, {$set: updateObject}),

    updateUserWithDocs: async (userId, docs) => await User.updateOne({_id: userId}, {documents: docs}),

    deleteUser: (userId) => User.deleteOne({_id: userId}),

    findEmail: (email) => User.find({email: `${email}`}),

}

