const { Schema, model } = require('mongoose');

const carsSubScheme = {
    model: {type: String},
    price: {type: Number}
};

const userScheme = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 15},
    cars: [carsSubScheme]
});

module.exports = model('User', userScheme);
