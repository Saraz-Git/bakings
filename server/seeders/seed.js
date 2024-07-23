const db = require('../config/connection');
const { User, Post, Tag } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const tagSeeds = require('./tagSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Post', 'posts');
        await cleanDB('User', 'users');
        await cleanDB('Tag', 'tags');

        const users = await User.create(userSeeds);

        const tags = await Tag.create(tagSeeds);

        // const posts = await Post.create(postSeeds);

        // for (let i = 0; i < postSeeds.length; i++) {
        //     const { _id, postAuthor } = await Post.create(postSeeds[i]);
        //     const user = await User.findOneAndUpdate(
        //         { username: postAuthor },
        //         {
        //             $addToSet: {
        //                 posts: _id,
        //             },
        //         }
        //     );
        // }

        // for (newPost of posts) {
        //     // randomly add each post to a user
        //     const tempUser = users[Math.floor(Math.random() * users.length)];
        //     tempUser.posts.push(newPost._id);

        //     newPost.postAuthor = tempUser._id;
        //     await newPost.save();
        //     await tempUser.save();

        //     // randomly add a tag to each post
        //     const tempTag = tags[Math.floor(Math.random() * tags.length)];
        //     tempTag.posts.push(newPost._id);
        //     await tempTag.save();
        // }


    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});