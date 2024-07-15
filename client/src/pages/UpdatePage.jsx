import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
  Textarea,
} from '@chakra-ui/react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom';



import { useRef, useState } from 'react';
import { useQuery ,useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';



import usePreviewImg from '../hooks/usePreviewImg';

const UpdatePage = () => {
  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }

  console.log(Auth.getProfile().data._id);
  
  const [formState, setFormState] = useState({ id: Auth.getProfile().data._id, username: '',password: '', bio: '', profileUrl: '' });
  const [updateUser, {error, data}]=useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
   };

    console.log(formState) ;

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });  
     
    } catch (e) {
      console.error(e);
    }
  }

  const fileRef = useRef(null);
  const {handleImageChange, imgUrl}= usePreviewImg();


  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container >
      <Stack
        spacing={4}
        w={'full'}
        
        my={12}>
        <Heading fontWeight="normal">
          Edit Profile
        </Heading>
        <FormControl id="userName">
          
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imgUrl}/>
                
              
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=> fileRef.current.click()}>Update Profile Picture</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" >
          <FormLabel >User name</FormLabel>
          <Input
           name="username"  
           onChange={handleChange}
            placeholder={Auth.getProfile().data.username}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>

          <FormControl id="password" >
          <FormLabel>Password</FormLabel>
          <Input
           name="password"
           onChange={handleChange}
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        
        <FormControl id="bio" >
          <FormLabel>Bio</FormLabel>
          <Textarea
            placeholder="your bio"
            name="bio" 
            onChange={handleChange}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
      
        <Stack pt={2} spacing={6} direction={['column', 'row']}>
          <Button
          onClick={() => navigate(-1)}
            colorScheme="orange"
            variant="outline"
            w="full"
           >
            Cancel
          </Button>
          <Button
          onClick={handleFormSubmit}
            colorScheme="orange"
            variant="solid"
            w="full"
           >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default UpdatePage