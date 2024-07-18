import { Container , Box, Divider, Flex, Text,Image} from '@chakra-ui/react';

const CommentList = () => {
  return (
    <Box>
      <Flex my={3} justifyContent={'space-between'}>
        <Box textAlign={'left'} fontSize={'sm'}>
          <Text py={3} >Amazing post, thanks</Text>
          <Text>Rating: 8.5</Text>
          <Text>Commented by username on 21Jan 2023</Text>
        </Box>
        <Image className='thumbnail'p={2} src='' fallbackSrc='https://via.placeholder.com/150' alt='commentPicture' objectFit='cover' />
      </Flex>
      <Divider/>
      
    </Box>
  )
}

export default CommentList