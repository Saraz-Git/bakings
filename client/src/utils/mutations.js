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
 user {
        _id
        username
        password
        bio
        profileUrl
      }
 }
}
`

export const ADD_POST = gql`
  mutation addPost($title: String!, $coverUrl: String) {
    addPost(title: $title, coverUrl: $coverUrl) {
      _id
      title
      postAuthor
      coverUrl
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      title
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
