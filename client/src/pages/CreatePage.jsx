import { Flex,Select , Input,Box,useColorModeValue,SimpleGrid,Stack,CheckboxGroup ,Checkbox, AspectRatio,Container,Image,Table,TableContainer,Tbody,Td,Text, Tr, Button, Editable,
  EditableInput,
  EditablePreview, } from "@chakra-ui/react";
  import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddIngredientForm from '../components/AddIngredientsForm';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST, UPDATE_TAG, ADD_INGREDIENT } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_TAGS } from '../utils/queries';

import usePreviewImg from '../hooks/usePreviewImg';

import Auth from '../utils/auth';



const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Click to Enter Post Title');
  const [detail, setDetail]=useState('');

  const [ingredients, setIngredients] = useState('');
  const handleChildData = (data) => {
    setIngredients(data) ;// Update the parent state with data from the child component
  };
  
  console.log(detail);
  const toolbarOptions = [
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  ['bold', 'italic', 'underline'],        
  ['image'],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': 1 }, { 'header': 2 }],               
  [{ 'align': [] }],
  ['clean'] 
  ];
  const modules = {
  toolbar: toolbarOptions
};

  if (!Auth.loggedIn() ) {
    return <Navigate to="/" />;
  }

  const { loading: loadingTag, data: dataTag } = useQuery(QUERY_TAGS);
  const tags = dataTag?.tags || [];

  const fileRef = useRef(null);
  const {handleImageChange, imgUrl}= usePreviewImg();
  // console.log(imgUrl);

  
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
  const[addIngredient,{error: addIngredientError}]=useMutation(ADD_INGREDIENT);

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
      if(postTags.includes(value)){
        const index = postTags.indexOf(value);
        const newTags=  postTags.splice(index, 1);
        setPostTags(newTags);   
      }else if(!postTags.includes(value)){
        postTags.push(value);
       
        } 

        setPostTags(postTags);
        
        console.log(postTags.length) ; 
    }
  }
  
//  console.log(postTags); 
   if(ingredients){
    ingredients.map((ingredient)=>(
    console.log(ingredient.material)

   ))
  }
  

   const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {title: title, coverUrl: imgUrl, detail: detail},
      });
      
      const newPost = data?.addPost;  
      console.log(newPost);

      if(postTags){

        postTags.map(async(postTag)=>(
          await updateTag({
        variables: {tagId: postTag, postId: newPost._id},
        })
        )) 
        }

      if(ingredients){
        ingredients.map(async(ingredient)=>(
          await addIngredient({
            variables:{postId:newPost._id, material:ingredient.material, amount:ingredient.amount}
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
      
      <Editable  my={4} textAlign={'center'} fontSize='1.8em'fontWeight={'bold'}  defaultValue={title}>
        <EditablePreview />
        <EditableInput name='title' onChange={handleChange} />
      </Editable>
      
      <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' fontWeight={'bold'} textAlign='left'>
          Choose Categories
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Box
          bg={useColorModeValue('white', 'gray.700')}
          my={2}>

      <CheckboxGroup colorScheme='orange'>
        <SimpleGrid columns={6} spacing={4}>
          {tags && tags.map((tag)=>(<Checkbox key={tag._id} name='tag' onChange={handleChange} value={tag._id}>{tag.tagText}</Checkbox>))}
        </SimpleGrid>
      </CheckboxGroup>
      </Box>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' fontWeight={'bold'} textAlign='left'>
          List Ingredients
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel px={1} pb={4}>
      <AddIngredientForm onData={handleChildData}/>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' fontWeight={'bold'}textAlign='left'>
          Step Instructions
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel px={1}pb={4}>
      <ReactQuill theme="snow" modules={modules} value={detail} onChange={setDetail} />
    </AccordionPanel>
  </AccordionItem>
</Accordion>
       
       

       {/* <Select name='tag' onChange={handleChange} placeholder='Select up to 3 tags'>
        {tags && tags.map((tag)=>(<option key={tag._id} value={tag._id}>{tag.tagText}</option>))}
      </Select> */}

      {/* <Box
          border='1px'
          borderColor='gray.200'
          bg={useColorModeValue('white', 'gray.700')}
          p={2}
          my={2}>

      <CheckboxGroup colorScheme='orange'>
        <SimpleGrid columns={6} spacing={4}>
          {tags && tags.map((tag)=>(<Checkbox key={tag._id} name='tag' onChange={handleChange} value={tag._id}>{tag.tagText}</Checkbox>))}
        </SimpleGrid>
      </CheckboxGroup>
      </Box> */}

      
      
      

     

      
      

      <Button mx={'auto'}my={4}display={'block'}type="submit" onClick={handleFormSubmit}>Submit</Button>


     


     </Container>
  )
}

export default CreatePage