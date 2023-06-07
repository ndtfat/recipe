const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        author: { type: String, required: true },
        title: { type: String, unique: true, required: true },
        desc: { type: String, unique: true, required: true },
        imgURL: { type: String, required: true },
        ingredients: { type: Array, required: true },
        steps: { type: Array, required: true },
        times: { type: Object, required: true },
        note: { type: Object },
        rated: { type: Number, default: 0 },
        isPublic: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('recipes', RecipeSchema);
