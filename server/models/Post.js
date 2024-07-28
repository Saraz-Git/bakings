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
    likedBy: [
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
            commentImg: {
                type: String,
            },
            rating: {
                type: Number,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

postSchema.methods.getRating = function () {

    if (this.comments.length === 0) { return null };
    const commentsArray = this.comments;

    if (commentsArray) {
        let total = 0;
        let count = 0;
        for (let comment of commentsArray) {
            if (comment.rating) {
                total += comment.rating;
                count++;
            }
        }
        if (total === 0 || count === 0) { return null } else { return Math.floor((total / count) * 10) / 10 };
    }
};
const Post = model('Post', postSchema);

module.exports = Post;
