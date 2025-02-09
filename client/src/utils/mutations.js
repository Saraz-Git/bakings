import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($id: ID!, $username: String, $password: String, $bio: String, $profileUrl:String){
 updateUser(id: $id, username:$username, password:$password, bio:$bio, profileUrl:$profileUrl){
 
        _id
        username
        password
        bio
        profileUrl
      
 }
}
`;
export const FOLLOW_USER = gql`
mutation followUser($followerId: ID!, $followingId: ID!){
  followUser(followerId: $followerId, followingId: $followingId){
    _id
    username
    followers{
      _id
      username
    }
  }
}
`;
export const UNFOLLOW_USER = gql`
mutation unfollowUser($followerId: ID!, $followingId: ID!){
  unfollowUser(followerId: $followerId, followingId: $followingId){
    _id
    username
    followers{
      _id
      username
    }
  }
}
`;

export const UPDATE_TAG = gql`
mutation updateTag ($tagId: ID!, $postId: ID!){
  updateTag(tagId: $tagId, postId: $postId){
      _id
      tagText
      posts{
        _id
        title
      }
  }
}
`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $coverUrl: String, $detail: String) {
    addPost(title: $title, coverUrl: $coverUrl, detail: $detail) {
      _id
      title
      postAuthor{
       _id
      }
      coverUrl
      detail
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
export const DELETE_POST = gql`
mutation deletePost($postId: ID!){
  deletePost(postId: $postId){
    _id
    title
  }
}
`;
export const ADD_INGREDIENT = gql`
mutation addIngredient($postId:ID! $material:String! $amount:String!){
  addIngredient(postId:$postId, material:$material, amount: $amount){
    _id
    title
  }
}
`;
export const ADD_COLLECTION = gql`
  mutation addCollection($postId:ID!){
    addCollection(postId: $postId){
     _id
     username
     collections {
     _id
     title
     coverUrl
     collectedBy{
         _id
     }
    }
  }
}
`;
export const REMOVE_COLLECTION = gql`
  mutation removeCollection($postId:ID!){
    removeCollection(postId: $postId){
     _id
     username
     collections {
     _id
     title
     coverUrl
     collectedBy{
         _id
      }
    }
  }
}
`;
export const ADD_LIKE = gql`
  mutation addLike($postId:ID!){
    addLike(postId: $postId){
     _id
    }
}
`;
export const REMOVE_LIKE = gql`
  mutation removeLike($postId:ID!){
    removeLike(postId: $postId){
     _id
     }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!,$commentImg: String, $rating: Float) {
    addComment(postId: $postId, commentText: $commentText, commentImg: $commentImg, rating: $rating) {
      _id
      title
      postAuthor{
       _id
      }
      createdAt
      comments {
        _id
        commentText
        createdAt
        rating
        commentImg
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
 mutation removeComment($postId: ID!, $commentId: ID!){
  removeComment(postId: $postId, commentId: $commentId){
    _id
    title
    postAuthor{
       _id
    }
    createdAt
    comments {
        _id
        commentText
        createdAt
        rating
        commentImg
    }
  }
 }
`;
