

import {Card,CardBody,Heading, Text, Link, Stack,Image, CardFooter,AspectRatio,Box, Flex} from '@chakra-ui/react';

const PostList = ({posts}) => {


  console.log(posts);

if (!posts.length) {
    return <Box>No Thoughts Yet</Box>;
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
       </CardBody>

       <CardFooter>
     
         <Text py='2'>
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
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