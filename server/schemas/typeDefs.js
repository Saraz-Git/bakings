const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    profileUrl: String
    posts: [Post]
    collections: [Post]
    following: [User]
    followers:[User]
  }

  type Post {
    _id: ID
    title: String
    coverUrl: String
    postAuthor: User
    detail: String
    createdAt: String
    ingredients: [Ingredient]
    comments: [Comment]
    collectedBy: [User]
  }

  type Tag {
    _id: ID
    tagText: String
    posts: [Post]
  }

  type Ingredient {
    _id: ID
    material: String
    amount: String
    postRelated: Post
  }
  
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    tags: [Tag]
    tag(tagId: ID!): Tag
    users: [User]
    user(userId: ID!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
    keywordPosts(word:String!):[Post]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(id: ID!, username: String, password: String, bio: String, profileUrl:String): User
    updateTag(tagId: ID!, postId: ID!): Tag
    login(email: String!, password: String!): Auth
    followUser(followerId: ID!, followingId: ID!): User
    unfollowUser(followerId: ID!, followingId: ID!): User
    addPost(title: String!, coverUrl: String, detail: String): Post
    addIngredient(postId:ID!, material:String!, amount: String!): Post
    addCollection(postId:ID!, userId:ID):User
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
