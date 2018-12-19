const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	id: String,
	accessToken: String,
	wallet: Number,
	school: String,
	avatar: String,
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;