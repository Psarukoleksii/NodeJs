const { Schema, model } = require('mongoose');

const carsSubScheme = {
    model: {type: String},
    price: {type: Number}
};

const docsSubScheme = {
    name: {type: String, required: true, default: 'Document1'},
    path: {type: String, required: true},
}

const userScheme = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 20},
    email: {type: String, required: true},
    password: {type: String, required: true, select: false}, // select: false -> request to front without password!!!
    avatar: {type: String},
    documents: [docsSubScheme],
    cars: [carsSubScheme]
});

module.exports = model('User', userScheme);
