import {Card,CardBody,Heading, Badge,Text, Link, Stack,Image, CardFooter,AspectRatio,Box, Flex} from '@chakra-ui/react';
// import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_POST} from '../utils/queries';

const PostList = ({posts}) => {
  console.log(posts);

if (!posts.length) {
    return <Box>No posts yet</Box>;
  }

  return (
   <Box>
    {posts && posts.map((post)=>(
      <Link key={post._id} w={'full'} href={`/posts/${post._id}`} style={{ textDecoration: 'none' }} >
        

       <Card
         direction={{ base: 'column', sm: 'row' }}
         overflow='hidden'
         variant='outline'
         shadow={'md'}
         w={'full'}
         h='250px'
         my={6}
       >

        
      
        <Image
        className='cardImg'
         w='600px'
         objectFit='cover'
        //  maxW={{ base: '100%', sm: '250px' }}
         src={post.coverUrl }
         fallbackSrc='https://via.placeholder.com/250'
         alt={post.title}
        />

      <Stack>
       <CardBody>
         <Heading size='md'>{post.title}</Heading> 

         <Badge colorScheme='pink'>
          1 Likes
          </Badge>


         {/* {post.collectedBy.length>0  &&
          <Badge mx={1}colorScheme='purple'>
          {post.collectedBy.length} collects
          </Badge>
         } */}
         
         
       </CardBody>

       <CardFooter>
     
         <Text fontSize={'xs'} py='2'>
          {post.createdAt}
         </Text>
       </CardFooter>
      </Stack>
     </Card>
    </Link>
    ))}

    </Box>



  )
}

export default PostList