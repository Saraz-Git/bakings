import { Avatar, Box, Button, Flex, Text ,Link, Container} from "@chakra-ui/react"
import { BsPlusSquareDotted } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import PostList from "../components/PostList";

import { Link as RouterLink } from "react-router-dom";

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const ProfilePage = () => {
  
  const { loading, data } = useQuery(useParams().userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: useParams().userId },
  });

  const user = data?.me || data?.user || {};
  
  
  if (Auth.loggedIn() && Auth.getProfile().data._id === useParams().userId) {
    return <Navigate to="/me" />;
  }
  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }

  return (

     <Container pb={12}>
    
    <Box my={12}>
        <Flex justifyContent={'space-between'} alignItems={'center'} mb={8}>
            <Flex alignItems={'center'} gap={4}>
              <Avatar name='username'
					src={user.profileUrl || 'https://bit.ly/broken-link'}
					size={{base: "md",md: "xl",}}/>
              <Text fontSize={'lg'}>{user.username}</Text>
            </Flex>
            <Flex gap={4}>

              <Link className='zoom'>
                <IoMdHeart size={24}/> 
              </Link>


              {Auth.getProfile().data._id=== user._id &&
              <Link as={RouterLink} to={"/me/update"} className='zoom'>
                <BiSolidEditAlt size={24} />
              </Link>}
              
              {Auth.getProfile().data._id=== user._id &&
              <Link as={RouterLink} to={"/me/create"} className='zoom'>
                <BsPlusSquareDotted size={22}/>
              </Link>}
              
              
              
            </Flex>
            
           
        </Flex>
        <Text >{user.bio}</Text>
        <Flex gap={2} alignItems={"center"} fontSize={'sm'}>
					<Text color={"gray.400"}>200 followers</Text>
					<Box w='1' h='1' bg={"gray.400"} borderRadius={"full"}></Box>
					<Text  color={"gray.400"}>30 posts</Text>
		</Flex>
        
    </Box>

    {user.posts && <PostList posts={user.posts}/>}


    
    </Container>
  )
}

export default ProfilePage