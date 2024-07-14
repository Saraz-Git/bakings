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

        await User.create(userSeeds);

        await Tag.create(tagSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const { _id, postAuthor } = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        posts: _id,
                    },
                }
            );
        }


    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});