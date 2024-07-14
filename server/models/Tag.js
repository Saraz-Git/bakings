const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    tagText: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
});

const Tag = model('Tag', tagSchema);

module.exports = Tag;
