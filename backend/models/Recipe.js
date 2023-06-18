const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const RecipeSchema = new Schema(
    {
        author: { type: String, required: true, ref: 'users' },
        title: { type: String, required: true },
        dishType: { type: String },
        desc: { type: String, required: true },
        imgURL: { type: String, required: true },
        ingredients: { type: Array, required: true },
        steps: { type: Array, required: true },
        times: { type: Object, required: true },
        note: { type: Object },
        total_rated: { type: Number, default: 0 },
        rate: { type: Number, default: 0 },
        isPublic: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

RecipeSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('recipes', RecipeSchema);
