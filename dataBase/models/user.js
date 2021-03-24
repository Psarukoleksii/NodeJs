const { Schema, model } = require('mongoose');

const carsSubScheme = {
    model: {type: String},
    price: {type: Number}
};

// const docsSubScheme = {
//     name: {type: String, default: 'Document1'},
//     path: {type: String},
// }

const userScheme = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 20},
    email: {type: String, required: true},
    password: {type: String, required: true}, // select: false -> request to front without password!!!
    avatar: {type: String},
    role: {type: String, default: 'user'},
    // documents: [docsSubScheme],
    cars: [carsSubScheme]
});

module.exports = model('User', userScheme);
