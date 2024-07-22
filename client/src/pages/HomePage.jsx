import { Container,Input,Grid, Card,Center, Button, LinkBox,InputGroup,InputLeftElement,useColorModeValue} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from '../utils/queries';
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_TAGS);
  const tags = data?.tags || [];
  return (
    <Container pb={12}>
     
      <InputGroup  my={'4'}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input focusBorderColor='orange.400' type='tel' placeholder='Search' />
      </InputGroup>

      <Grid templateColumns='repeat(3, 2fr)' gap={6}>
        
        {tags && tags.map((tag)=>(
          <LinkBox key={tag._id} as={RouterLink} to={`/tags/${tag._id}`} >
           <Center  w='100%' h='40' fontSize='xl' textTransform='uppercase' color='red.200' bg={useColorModeValue('red.100', 'gray.800')}>{tag.tagText}</Center>
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