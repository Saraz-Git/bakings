import { Avatar, Box, Button, Flex, Text ,Link, Container,Tooltip,Spinner} from "@chakra-ui/react"
import { IconContext } from "react-icons";
import { BsPlusSquareDotted } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import PostList from "../components/PostList";
import { Link as RouterLink } from "react-router-dom";

import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import {FOLLOW_USER, UNFOLLOW_USER} from '../utils/mutations';

import Auth from '../utils/auth';
import {useState, useEffect} from "react";


const ProfilePage = () => {
  
  const [pageKey, setPageKey] = useState(Date.now());
  let fill; 

 useEffect(()=>{fill={ color: 'green'};},[pageKey])
  
  const { loading, data } = useQuery(useParams().userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: useParams().userId },
  });

  const user = data?.me || data?.user || {};

  const [followUser, {error: error1}]= useMutation(FOLLOW_USER,{
    refetchQueries:[QUERY_USER]
  });
  const [unfollowUser, {error: error2}]= useMutation(UNFOLLOW_USER,{
    refetchQueries:[QUERY_USER]
  });


  
  if (Auth.loggedIn() && Auth.getProfile().data._id === useParams().userId) {
    return <Navigate to="/me" />;
  }
  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }
 

  
  const handleFollow = async(event)=>{
    event.preventDefault();
    if(!isFollowing){
      try{
        await followUser({variables:{followerId:Auth.getProfile().data._id, followingId: user._id}});
        // fill={ color: 'crimson'};  
        isFollowing=!isFollowing;  
           
      }catch(e){
      console.log(e);
      }
    }else{
      try{
        await unfollowUser({variables:{followerId:Auth.getProfile().data._id, followingId: user._id}});
        // fill={ color: 'gray'};
        isFollowing=!isFollowing;       
      }catch(e){
      console.log(e);
      }
    }
      // setPageKey(Date.now()); 
      // window.location.reload();
  };
  

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
  

  const followers= user.followers;
  const idArr= followers.map((follower)=>(follower._id));
  let isFollowing= idArr.includes(Auth.getProfile().data._id);
  if(isFollowing==true){fill={ color: 'crimson'};}else{fill={ color: 'gray'};}
 

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

              <IconContext.Provider value={fill}>
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
					<Text id='followerText'color={"gray.400"}>{user.followers.length} followers</Text>
					<Box w='1' h='1' bg={"gray.400"} borderRadius={"full"}></Box>
					<Text  color={"gray.400"}>{user.posts.length} posts</Text>
		</Flex>
        
    </Box>

    {user.posts && <PostList posts={user.posts}/>}


    
    </Container>
  )
}

export default ProfilePage