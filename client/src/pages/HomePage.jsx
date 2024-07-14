import { Container,Input,Grid, Center, Button, LinkBox } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from '../utils/queries';
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_TAGS);
  const tags = data?.tags || [];
  return (
    <Container pb={12}>
      <Input my={'4'}placeholder='Search' />

      <Grid templateColumns='repeat(3, 2fr)' gap={6}>
        
        {tags && tags.map((tag)=>(
          <LinkBox key={tag._id} as={RouterLink} to={`/tags/${tag._id}`} >
           <Center  w='100%' h='40' fontSize='xl' textTransform='uppercase' color='red.200' bg='red.100'>{tag.tagText}</Center>
         </LinkBox>))}

      </Grid>

      <Button mt={'12'} w={'full'} mx={'auto'} bg={'orange.400'}
                color={'white'}
                _hover={{
                  bg: 'orange.500',
                }}>Expand</Button>

      

    </Container>
  )
}

export default HomePage