import { Flex,Select , Input,Box,AspectRatio,Container,Image,Table,TableContainer,Tbody,Td,Text, Tr, Button, Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview, } from "@chakra-ui/react"
import AddIngredientForm from '../components/AddIngredientsForm';
import AddStepForm from '../components/AddStepForm';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST, UPDATE_TAG } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_TAGS } from '../utils/queries';

import usePreviewImg from '../hooks/usePreviewImg';

import Auth from '../utils/auth';



const CreatePage = () => {
  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }

  const { loading: loadingTag, data: dataTag } = useQuery(QUERY_TAGS);
  const tags = dataTag?.tags || [];

  const fileRef = useRef(null);
  const {handleImageChange, imgUrl}= usePreviewImg();
  // console.log(imgUrl);

  const [title, setTitle] = useState('');
  // const [formState, setFormState] = useState({ title: '' });

  const [postTags, setPostTags] = useState([]);

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts',
      QUERY_ME,
      'me'
    ]
  });

  const [updateTag, {error: updateTagError}]= useMutation(UPDATE_TAG);

  const handleChange = (event) => {
    const { name, value } = event.target;
//      setFormState({
//       ...formState,
//       [name]: value,
//     });
// console.log(formState);
    if (name === 'title') {
      setTitle(value);    
    }

    if(name === 'tag'){
      if(postTags.length<3 && !postTags.includes(value)){
        postTags.push(value);
      setPostTags(postTags);}    
    }
  }

//  console.log(postTags);

   const navigate = useNavigate();

   const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {title: title, coverUrl: imgUrl},
      });
      
      const newPost = data?.addPost;  

      if(postTags){

        postTags.map(async(postTag)=>(
          await updateTag({
        variables: {tagId: postTag, postId: newPost._id},
        })
        )) 
        }

        
        navigate('/me');

    } catch (err) {
      console.error(err);
    }

  };



  return (
     <Container  py={12}>
      <AspectRatio ratio={3 / 2}>
        <Image
        name='coverUrl'
        onClick={()=> fileRef.current.click()}
        onChange={handleChange}
        w={'full'}
        objectFit='cover'
        src={imgUrl || 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
        alt='Cover Image'
      />
      
      </AspectRatio>
      <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
      
      <Editable my={4} textAlign={'center'} fontSize='1.8em'fontWeight={'bold'}  defaultValue='Post Title' >
        <EditablePreview />
        <EditableInput name='title' onChange={handleChange} />
      </Editable>
      {/* <Text>Author: {Auth.getProfile().data.username}</Text> */}

       
       

       <Select name='tag' onChange={handleChange} placeholder='Select up to 3 tags'>
        {tags && tags.map((tag)=>(<option key={tag._id} value={tag._id}>{tag.tagText}</option>))}
      </Select>

      
      <AddIngredientForm/>
      <AddStepForm/>

      <Editable p={2} defaultValue='Add Note'>
        <EditablePreview />
        <EditableTextarea />
      </Editable>


      <Button display={'block'}type="submit" onClick={handleFormSubmit}>Submit</Button>


     


     </Container>
  )
}

export default CreatePage