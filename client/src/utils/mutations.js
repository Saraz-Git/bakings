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
  mutation addPost($title: String!, $coverUrl: String) {
    addPost(title: $title, coverUrl: $coverUrl) {
      _id
      title
      postAuthor{
       _id
      }
      coverUrl
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($postId:ID!  $userId: ID){
    addCollection(postId: $postId,  userId: $userId){
     _id
     username
     collections {
     _id
     title
     coverUrl
     }

  }
}
`

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
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
      }
    }
  }
`;
