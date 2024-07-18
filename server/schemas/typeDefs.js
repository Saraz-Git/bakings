const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    profileUrl: String
    posts: [Post]
  }

  type Post {
    _id: ID
    title: String
    coverUrl: String
    postAuthor: User
    createdAt: String
    comments: [Comment]
  }

  type Tag {
    _id: ID
    tagText: String
    posts: [Post]
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(id: ID!, username: String, password: String, bio: String, profileUrl:String): User
    updateTag(tagId: ID!, postId: ID!): Tag
    login(email: String!, password: String!): Auth
    addPost(title: String!, coverUrl: String): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
