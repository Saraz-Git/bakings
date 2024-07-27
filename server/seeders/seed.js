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

        const posts = await Post.create(postSeeds);

        for (newPost of posts) {
            // randomly add each post to a user
            const tempUser = users[Math.floor(Math.random() * users.length)];
            tempUser.posts.push(newPost._id);

            newPost.postAuthor = tempUser._id;
            await newPost.save();
            await tempUser.save();

            // add tag to each post
            await Tag.findOneAndUpdate(
                { tagText: { $regex: "Dessert", $options: 'i' } },
                { $addToSet: { posts: newPost._id } },
                { new: true }
            );

            if (newPost.title == "Banana Bread") {
                await Tag.findOneAndUpdate(
                    { tagText: "Bread" },
                    { $addToSet: { posts: newPost._id } },
                    { new: true }
                );
            };
            if (newPost.title == "Flourless Orange Cake") {
                await Tag.findOneAndUpdate(
                    { tagText: { $regex: "cake", $options: 'i' } },
                    { $addToSet: { posts: newPost._id } },
                    { new: true }
                );
            };
            if (newPost.title == "Classic Scone") {
                await Tag.findOneAndUpdate(
                    { tagText: { $regex: "breakfast", $options: 'i' } },
                    { $addToSet: { posts: newPost._id } },
                    { new: true }
                );
            };
            if (newPost.title == "Christmas Sugar Cookies") {
                await Tag.findOneAndUpdate(
                    { tagText: { $regex: "holiday", $options: 'i' } },
                    { $addToSet: { posts: newPost._id } },
                    { new: true }
                );
            };
        }


    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});