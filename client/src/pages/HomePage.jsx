import { Container,Spinner,Input,Grid, Card,Center, Button, LinkBox,InputGroup,InputLeftElement,useColorModeValue} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { SearchIcon ,ChevronDownIcon} from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from '../utils/queries';
import { Link as RouterLink } from "react-router-dom";
import { useState } from 'react';

const HomePage = () => {
  const[isMenuOpen, setIsMenuOpen]=useState(false);
  const[result,setResult]=useState('');
  const { loading, data } = useQuery(QUERY_TAGS);
  const tags = data?.tags || [];

  const handleInputChange=(event)=>{
    setResult(event.target.value);
    setIsMenuOpen(true);
  };

 
  return (
    <Container pb={12}>

      <Menu isOpen={isMenuOpen}>
        
        <InputGroup  my={'4'}>
          <InputLeftElement >
            <MenuButton as={Button} variant='ghost' _hover={{ bg:'none'}}_active={{ bg:'none'}} rightIcon={<SearchIcon color='gray.300' />}></MenuButton>
          </InputLeftElement>
          <Input focusBorderColor='orange.400' type='search' placeholder='Search' onChange={handleInputChange} />
        </InputGroup>

        <MenuList>
          <MenuItem onClick={() => setIsMenuOpen(false)}>DownloadDownloadDownloadDownloadDownloadDownloadDownload</MenuItem>
          <MenuItem>{result}</MenuItem>
        </MenuList>
      </Menu>



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