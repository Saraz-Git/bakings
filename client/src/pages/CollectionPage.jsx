import PostList from "../components/PostList";
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container } from "@chakra-ui/react";

const CollectionPage = () => {
  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }

  const{loading,data}= useQuery(QUERY_USER,{
    variables:{userId:Auth.getProfile().data._id}
  });

  const user = data?.user || {};

  
  return (
    <Container>
      {user.collections && <PostList posts={user.collections}/>}


    </Container>
  )
}

export default CollectionPage