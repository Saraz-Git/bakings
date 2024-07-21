import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      bio
      profileUrl
      posts {
        _id
        title
        coverUrl
        createdAt
        collectedBy{
         _id
        }
      }
      collections {
        _id
        title
        coverUrl
        createdAt
        postAuthor{
        _id
        username
        collectedBy{
         _id
         }
        }
      }
      followers{
        _id
        username
      }
      following{
        _id
        username
      }
    }
  }
`;

export const QUERY_TAGS = gql`
  query getTags {
    tags {
      _id
      tagText
      posts {
        _id
        title
        coverUrl
        createdAt
      }
    }
  }
`;

export const QUERY_TAG = gql`
  query getSingleTag($tagId: ID!) {
   tag (tagId: $tagId) {
      _id
      tagText
      posts {
        _id
        title
        coverUrl
        createdAt
        postAuthor{
        _id
        username
        }
        collectedBy{
         _id
        }
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      title
      postAuthor{
       _id
      }
      coverUrl
      createdAt
      collectedBy{
      _id
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      title
      coverUrl
      postAuthor{
       _id
       username
      }
      collectedBy{
      _id
      }
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      profileUrl
      posts {
        _id
        title
        coverUrl
        postAuthor{
         _id
        } 
        createdAt
      }
      followers {
        _id
      }
    }
  }
`;
