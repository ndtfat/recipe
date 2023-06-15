const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        author: { type: String, ref: 'users' },
        for_recipe: { type: String },
        rate: { type: Number },
        content: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('reviews', ReviewSchema);
