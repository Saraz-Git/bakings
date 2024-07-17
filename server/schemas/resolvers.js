const { User, Post, Tag } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const cloudinary = require('../cloudinaryConfig');

const resolvers = {
    Query: {
        tags: async () => {
            return Tag.find().populate('posts');
        },
        users: async () => {
            return User.find().populate('posts');
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('posts');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('posts');
            }
            throw AuthenticationError;
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


        addPost: async (parent, { title, coverUrl }, context) => {
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
                    postAuthor: context.user.username,
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
