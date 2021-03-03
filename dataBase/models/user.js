const { Schema, model } = require('mongoose');

const carsSubScheme = {
    model: {type: String},
    price: {type: Number}
};

const userScheme = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 15},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cars: [carsSubScheme]
});

module.exports = model('User', userScheme);
