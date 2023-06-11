const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        saved_recipes: { type: Array, default: [], ref: 'recipes' },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', UserSchema);
