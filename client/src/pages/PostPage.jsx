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

import { useParams } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import { useQuery , useMutation} from '@apollo/client';
import { QUERY_SINGLE_POST, QUERY_USER } from '../utils/queries';
import {ADD_COLLECTION} from '../utils/mutations';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const PostPage = () => {
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

    } catch (e) {
      console.error(e);
    }
    toast("Successfully collected the post!"); 
    window.location.reload();
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
    <Container py={12}>
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
        <Box bg='red.100' borderRadius={'md'} p={2}>
          <Text fontSize={'sm'}>Prep: 5 mins  Cook: 10 mins</Text>
          <Text fontSize={'sm'}>4.8  120 ratings  230 likes  {post.collectedBy.length} collects</Text>
        </Box>
         <Box bg='red.100' borderRadius={'md'} p={2} textAlign={'center'}>
          <Text fontSize={'sm'}>Author</Text>
          <Text as={RouterLink} to={`/profiles/${post.postAuthor._id}`} fontSize={'sm'}>{post.postAuthor.username}</Text>
        </Box>

      </Flex>
      
      
      <Text mt={8}fontSize='1.2em'fontWeight={'bold'}>Ingredients</Text>
      <TableContainer>
        <Table size='sm' variant='simple'>
          <Tbody>
            <Tr>
              <Td>self-raising flour</Td>
              <Td>350 g</Td>
            </Tr>
            <Tr>
              <Td>baking powder</Td>
              <Td>1 tsp</Td>
            </Tr>
            <Tr>
              <Td>butter</Td>
              <Td>85 g</Td>
            </Tr>
            <Tr>
              <Td>caster sugar</Td>
              <Td>3 tsp</Td>
            </Tr>
            <Tr>
              <Td>milk</Td>
              <Td>175 ml</Td>
            </Tr>
            <Tr>
              <Td>beaten egg (to glaze)</Td>
              <Td>1</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      
       
      <Text mt={8}  fontSize='1.2em' fontWeight={'bold'}>Instructions</Text>
      
      
      <Text fontWeight={'semibold'}  mt={2}>Step 1</Text>

      <Flex direction={{ base: 'column', md: 'row' }}>
       
        <Image className='stepImg' src='https://res.cloudinary.com/dkeswd23y/image/upload/v1721106409/jc8459mxscxxeujoqyaa.webp' alt='alt' objectFit='cover' />
        
        <Text bg='gray.200'>1234sknkjerqlgk12341234sknkjerqlgk12341234sknkjerqlgk1234</Text>
        
      </Flex>
      


      <AspectRatio ratio={3 / 2}>
        <Image
        w={'full'}
        objectFit='cover'
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Dan Abramov'
      />
      </AspectRatio>
      <Text fontSize={'sm'}py={2}>Preheat the oven to 220C/200C fan mode. Tip the self-raising flour into a large bowl with the baking powder, then mix.</Text>

      
      <Text fontWeight={'semibold'} mt={4}>Step 2</Text>
      <AspectRatio ratio={3 / 2}>
        <Image
        w={'full'}
        objectFit='cover'
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Dan Abramov'
      />
      </AspectRatio>
      <Text fontSize={'sm'} py={2}>Add the butter, then rub in with your fingers until the mix looks like fine crumbs. Stir in the caster sugar.</Text>

      <Text fontWeight={'semibold'}  mt={4}>Step 3</Text>
      <Text fontSize={'sm'} py={2}>Put the milk into a jug and heat in the microwave for about 30 secs until warm, but not hot. Could add vanilla extract and a squeeze of lemon juice, then set aside for a moment.</Text>

      <Text fontWeight={'semibold'}  mt={4}>Step 4</Text>
      <Text fontSize={'sm'} py={2}>Put a baking tray in the oven. Make a well in the dry mix, then add the liquid and combine it quickly with a cutlery knife.</Text>

      <Text fontWeight={'semibold'}  mt={4}>Step 5</Text>
      <Text fontSize={'sm'} py={2}>Scatter some flour onto the work surface and tip the dough out. Dredge the dough and your hands with a little more flour, then fold the dough over 2-3 times until it’s a little smoother. Pat into a round about 4cm deep. Cut with 5cm cutter.</Text>

      <Text fontWeight={'semibold'}  mt={4}>Step 6</Text>
      <Text fontSize={'sm'} py={2}>Brush the tops with a beaten egg, then carefully arrange on the hot baking tray. Bake for 10 mins until risen and golden on the top. Eat just warm or cold on the day of baking, generously topped with jam and clotted cream.</Text>
      
      
      
      
      
      <Text mt={8}  fontSize='1.2em' fontWeight={'bold'}>Notes</Text>
      <Text fontSize='sm'>This bread is moist, so it will keep for just two or three days at room temperature. Store it in the refrigerator for five to seven days, or in the freezer for up to three months or so. I like to slice the bread before freezing and defrost individual slices, either by letting them rest at room temperature or lightly toasting them.</Text>
     
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