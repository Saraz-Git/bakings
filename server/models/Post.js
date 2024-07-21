const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
    title: {
        type: String,
        required: 'You need to leave a title!',
        minlength: 1,
        maxlength: 60,
        trim: true,
    },
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coverUrl: {
        type: String,
        required: 'You need to upload a cover image!',
    },
    ingredients: [
        {
            material: {
                type: String,
                // required: true,
                minlength: 1,
                maxlength: 30,
                trim: true,
            },
            amount: {
                type: String,
                // required: true,
                minlength: 1,
                maxlength: 30,
                trim: true,
            },
        },
    ],
    instructions: [
        {
            stepText: {
                type: String,
                // required: true,
                minlength: 1,
                maxlength: 280,
                trim: true,
            },
            stepImageUrl: {
                type: String,
            },
        },
    ],
    detail: {
        type: String,
        minlength: 1,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    collectedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Post = model('Post', postSchema);

module.exports = Post;
