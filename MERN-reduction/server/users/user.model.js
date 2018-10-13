const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String },
    password: {type: String},
    avatar: {type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);