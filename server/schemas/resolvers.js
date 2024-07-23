const { User, Post, Tag } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const cloudinary = require('../cloudinaryConfig');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        tags: async () => {
            return Tag.find().populate('posts');
        },
        tag: async (_, { tagId }) => {

            return Tag.findById({ _id: tagId }).populate('posts');
        },
        users: async () => {
            return User.find().populate('posts').populate('followers').populate('following').populate('collections');
        },
        user: async (parent, { userId }) => {
            return User.findById({ _id: userId }).populate('posts').populate('followers').populate('following').populate('collections');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 }).populate('collectedBy');
        },
        post: async (parent, { postId }) => {
            return Post.findById({ _id: postId }).populate('postAuthor').populate('collectedBy');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('posts');
            }
            throw AuthenticationError;
        },
        keywordPosts: async (_, { word }) => {

            return await Post.find({ title: { $regex: word, $options: 'i' } })

        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (_, { id, username, password, bio, profileUrl }) => {
            const user = await User.findOne({ _id: id });
            if (profileUrl) {
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                });

                if (user.profileUrl) {
                    await cloudinary.uploader.destroy(user.profileUrl.split("/").pop().split(".")[0]);
                }

                const uploadedResponse = await cloudinary.uploader.upload(profileUrl);
                profileUrl = uploadedResponse.secure_url;

            }

            if (password) {
                password = await bcrypt.hash(password, 10);
            }

            return await User.findOneAndUpdate(
                { _id: id },
                {
                    username: username,
                    password: password,
                    bio: bio,
                    profileUrl: profileUrl
                },
                // Return the newly updated object instead of the original
                { new: true }
            );
        },
        followUser: async (_, { followerId, followingId }) => {
            const follower = await User.findById({ _id: followerId });
            const following = await User.findById({ _id: followingId });

            if (!follower || !following) {
                throw new Error('User not found');
            }

            await User.findOneAndUpdate(
                { _id: followerId },
                { $addToSet: { following: followingId } },
                { new: true }
            );
            await User.findOneAndUpdate(
                { _id: followingId },
                { $addToSet: { followers: followerId } },
                { new: true }
            );
        },
        unfollowUser: async (_, { followerId, followingId }) => {
            const follower = await User.findById({ _id: followerId });
            const following = await User.findById({ _id: followingId });

            if (!follower || !following) {
                throw new Error('User not found');
            }

            await User.findOneAndUpdate(
                { _id: followerId },
                { $pull: { following: followingId } },
                { new: true }
            );
            await User.findOneAndUpdate(
                { _id: followingId },
                { $pull: { followers: followerId } },
                { new: true }
            );
        },

        updateTag: async (_, { tagId, postId }, context) => {
            await Tag.findOneAndUpdate(
                { _id: tagId },
                { $addToSet: { posts: postId } },
                { new: true }
            );
        },

        addPost: async (parent, { title, coverUrl, detail }, context) => {
            if (context.user) {
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                });

                if (coverUrl) {
                    const uploadedResponse = await cloudinary.uploader.upload(coverUrl);
                    coverUrl = uploadedResponse.secure_url;
                };

                const post = await Post.create({
                    title,
                    coverUrl,
                    detail,
                    postAuthor: context.user._id,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );


                // [tagTexts] for each 
                // await Tag.findOneAndUpdate(
                //     { tagText: tagText },
                //     { $addToSet: { posts: post._id } }
                // );

                return post;
            }
            throw AuthenticationError;
            ('You need to be logged in!');
        },
        addIngredient: async (parent, { postId, material, amount }, context) => {

            return Post.findOneAndUpdate(
                { _id: postId },
                {
                    $addToSet: {
                        ingredients: { material, amount },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        },
        // addComment: async (parent, { thoughtId, commentText }, context) => {
        //     if (context.user) {
        //         return Thought.findOneAndUpdate(
        //             { _id: thoughtId },
        //             {
        //                 $addToSet: {
        //                     comments: { commentText, commentAuthor: context.user.username },
        //                 },
        //             },
        //             {
        //                 new: true,
        //                 runValidators: true,
        //             }
        //         );
        //     }
        //     throw AuthenticationError;
        // },
        addCollection: async (parent, { postId, userId }, context) => {
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { collections: postId } },
                { new: true }
            );
            const post = await Post.findOneAndUpdate(
                { _id: postId },
                { $addToSet: { collectedBy: userId } },
                { new: true }
            );
            return post;
        },
        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                );

                return post;
            }
            throw AuthenticationError;
        },
        // removeComment: async (parent, { thoughtId, commentId }, context) => {
        //     if (context.user) {
        //         return Thought.findOneAndUpdate(
        //             { _id: thoughtId },
        //             {
        //                 $pull: {
        //                     comments: {
        //                         _id: commentId,
        //                         commentAuthor: context.user.username,
        //                     },
        //                 },
        //             },
        //             { new: true }
        //         );
        //     }
        //     throw AuthenticationError;
        // },
    },
};

module.exports = resolvers;
