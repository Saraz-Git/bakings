import {Card,CardBody,Heading, Text, Link, Stack,Image, CardFooter,AspectRatio} from '@chakra-ui/react';

const PostCard = ({postId, title,imgUrl}) => {
  return (
    <Link w={'full'} href='/posts/:id' style={{ textDecoration: 'none' }} className='offset'>
    <Card
     direction={{ base: 'column', sm: 'row' }}
     overflow='hidden'
     variant='outline'
     shadow={'lg'}
     w={'full'}
>
  
  
     <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '250px' }}
      src={imgUrl}
      alt={title}
    />

  
  
 

  <Stack>
    <CardBody>
      <Heading size='md'>{title}</Heading>

      
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
  )
}

export default PostCard