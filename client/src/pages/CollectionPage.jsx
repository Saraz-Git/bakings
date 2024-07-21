import PostList from "../components/PostList";
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Navigate,useParams  } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Spinner,Text } from "@chakra-ui/react";

const CollectionPage = () => {
    const{loading,data}= useQuery(QUERY_USER,{
    variables:{userId: Auth.getProfile().data._id}
  });

  const user = data?.user || {};
  console.log(user);

  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }
 



   if(loading){
    return  <Spinner
             thickness='4px'
             speed='0.65s'
             emptyColor='gray.200'
             color='orange.500'
             size='xl'
             m={12}
             />
  }

  
  return (
    <Container py={6}>
      <Text fontSize={'lg'}>Your collection: </Text>
      
      {user.collections && <PostList posts={user.collections}/>}


    </Container>
  )
}

export default CollectionPage