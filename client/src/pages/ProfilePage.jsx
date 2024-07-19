import { Avatar, Box, Button, Flex, Text ,Link, Container,Tooltip} from "@chakra-ui/react"
import { IconContext } from "react-icons";
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

  // let liked = true;
  const handleFollow = ()=>(console.log('test')
    );
  // console.log(!liked);

  return (

     <Container pb={12}>
    
     <Box my={6}>
        <Flex justifyContent={'space-between'} alignItems={'center'} mb={8}>
            <Flex alignItems={'center'} gap={4}>
              <Avatar name='username'
					src={user.profileUrl || 'https://bit.ly/broken-link'}
					size={{base: "md",md: "xl",}}/>
              <Text fontSize={'lg'}>{user.username}</Text>
            </Flex>
            <Flex gap={4}>

              {Auth.getProfile().data._id !== user._id && 

              <IconContext.Provider value={{ color: 'crimson'}}>
                <Box className='zoom'>
                  <IoMdHeart onClick={handleFollow} size={24}/> 
                </Box>
              </IconContext.Provider>

              
              }

              {Auth.getProfile().data._id=== user._id &&
              <Tooltip hasArrow placement='top' label='Edit Profile' bg='gray.200' color='gray.600'>
              <Link as={RouterLink} to={"/me/update"} className='zoom'>
                <BiSolidEditAlt size={24} />
              </Link></Tooltip>}
              
              {Auth.getProfile().data._id=== user._id &&
              <Tooltip hasArrow placement='top' label='Create Post' bg='gray.200' color='gray.600'>
              <Link as={RouterLink} to={"/me/create"} className='zoom'>
                <BsPlusSquareDotted size={22}/>
              </Link></Tooltip>}
              
              
              
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