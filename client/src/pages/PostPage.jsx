import { Flex,Box,AspectRatio,Container,Image,Table,TableContainer,Tbody,Td,Text, Tr, Spinner,  Button,Tooltip,Link, Center} from "@chakra-ui/react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { BsStar,BsChatText} from "react-icons/bs";
import { RiThumbUpLine} from "react-icons/ri";
import { SlPrinter } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import { useQuery , useMutation} from '@apollo/client';
import { QUERY_SINGLE_POST, QUERY_USER } from '../utils/queries';
import {ADD_COLLECTION} from '../utils/mutations';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';
import { useEffect, useState } from "react";

const PostPage = () => {
  const [collected, setCollected]= useState(false); useEffect
  useEffect(() => {
    console.log(`Collected changed to: ${collected}`);
  }, [collected]);
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });
  const post = data?.post || {};

  console.log(post);

  const [addCollection, {error: error3}]= useMutation(ADD_COLLECTION);

  const handleCollect = async(event)=>{
    event.preventDefault();
    try {
       await addCollection({
        variables: { postId: postId, userId: Auth.getProfile().data._id},
      });
      setCollected(true);

    } catch (e) {
      console.error(e);
    }
    toast("Successfully collected the post!"); 
    
  };
 

  if(loading ){
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
      <AspectRatio ratio={3 / 2}>
        <Image
        w={'full'}
        objectFit='cover'
        src={post.coverUrl}
        fallbackSrc='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        
        alt={post.title}
      />
      </AspectRatio>
      <Text py={4}fontSize='1.8em'fontWeight={'bold'} textAlign={'center'}>{post.title}</Text>

      <Flex justifyContent={'space-between'}>
        <Flex bg='red.100' borderRadius={'md'} p={2}>
          <Text fontSize={'sm'}>4.8  120 ratings  230 likes  {post.collectedBy.length} collects</Text>
        </Flex>
         <Box bg='red.100' borderRadius={'md'} p={2} textAlign={'center'}>
          <Text as={RouterLink} to={`/profiles/${post.postAuthor._id}`} fontSize={'sm'}>Author-{post.postAuthor.username}</Text>
        </Box>

      </Flex>
      
      
      {post.ingredients.length>0 && <Text mt={8}fontSize='1.2em'fontWeight={'bold'}>Ingredients</Text>}
      <TableContainer>
        <Table size='sm' variant='simple'>
          <Tbody>

          {post.ingredients.length>0 && post.ingredients.map((ingredient)=>(
            <Tr key={ingredient._id}>
              <Td>{ingredient.material}</Td>
              <Td>{ingredient.amount}</Td>
            </Tr>))}
            
          </Tbody>
        </Table>
      </TableContainer>

      {post.detail && <Text mt={8}  fontSize='1.2em' fontWeight={'bold'}>Instructions</Text> } 
      {post.detail &&  <ReactQuill  value={post.detail} readOnly={true} theme={"bubble"}/>}
       
      <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          hideProgressBar={true}
          theme="colored"
          type="error"
      />

      <Center>
      <Flex my={12}gap={'8'}>
        {Auth.loggedIn() && post.postAuthor.username !== Auth.getProfile().data.username &&
          <>
            <Tooltip hasArrow placement='top' label='Collect' bg='gray.200' color='gray.600'>
              <Link ><BsStar onClick={handleCollect} className='zoom' size={24}/></Link></Tooltip>

            <Tooltip hasArrow placement='top' label='Like' bg='gray.200' color='gray.600'>
            <Link ><RiThumbUpLine className='zoom' size={23} /> </Link></Tooltip>

            <Tooltip hasArrow placement='top' label='Feedback' bg='gray.200' color='gray.600'>
            <Link ><BsChatText className='zoom' size={21} /> </Link></Tooltip>

            <Tooltip hasArrow placement='top' label='Print' bg='gray.200' color='gray.600'>
            <Box ><SlPrinter  className='zoom' size={20} /> </Box></Tooltip>
            
          </>
         }
        
      </Flex>
      </Center>

   

      
      
      <Text mt={"200px"}  fontSize='1.2em' fontWeight={'bold'}>Reviews</Text>


      <CommentList comments={post.comments} />
      

      <Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Comment
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      
      <CommentForm postId={post._id}/>
    </AccordionPanel>
  </AccordionItem>
  </Accordion>

      
    </Container>
  )
}

export default PostPage