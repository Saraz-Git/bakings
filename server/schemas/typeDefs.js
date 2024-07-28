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
    ingredients: [Ingredient]
    detail: String
    createdAt: String
    comments: [Comment]
    collectedBy: [User]
    likedBy: [User]
    getRating:Float
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
    rating: Float
    commentImg: String
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
    deletePost(postId: ID!):Post
    addIngredient(postId:ID!, material:String!, amount: String!): Post
    addCollection(postId:ID!):User
    removeCollection(postId:ID!):User
    addLike(postId:ID!):User
    removeLike(postId:ID!):User
    addComment(postId: ID!, commentText: String!,commentImg: String, rating: Float): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
