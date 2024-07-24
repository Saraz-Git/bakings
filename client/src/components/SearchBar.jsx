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
import { QUERY_TAGS, QUERY_KEYWORDPOSTS } from '../utils/queries';
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from 'react';

const SearchBar = () => {
  const[isMenuOpen, setIsMenuOpen]=useState(false);
  const[keyword, setKeyword]= useState()
  // useEffect(()=>{console.log('test')},[keyword]);
  
  
 

  const handleInputChange=(event)=>{
    setKeyword(event.target.value);
    setIsMenuOpen(true);
  };
  
  // const handleSubmit= (e)=>{
  //   e.preventDefault();
  //   let keyword= e.target.value;
  //   return keyword}   
  // };

  //  const { loading: loading2, data: data2 } = useQuery(QUERY_KEYWORDPOSTS,{
  //      variables: { word: keyword },
  //   });
  //   let results=data2?.keywordPosts || [];
  //   console.log(results)
    
  
   
    

  return (
    <Container p={0}>
        <Menu isOpen={isMenuOpen}>
        
        <InputGroup my={'4'}>
          <InputLeftElement >
            <MenuButton as={Button} variant='ghost' _hover={{ bg:'none'}}_active={{ bg:'none'}} rightIcon={<SearchIcon color='gray.300' />}></MenuButton>
          </InputLeftElement>
          <Input focusBorderColor='orange.400' type='search' placeholder='Search'  onKeyPress={e=> {
        if (e.key === 'Enter') {console.log(e)}
     }}/>
        </InputGroup>

        <MenuList>
          <MenuItem onClick={() => setIsMenuOpen(false)}>DownloadDownloadDownloadDownloadDownloadDownloadDownload</MenuItem>
          <MenuItem>keyword</MenuItem>
          {/* {results.length>0 && results.map((result)=>{<MenuItem key={result._id}>{result.title}</MenuItem>})} */}
        </MenuList>
      </Menu>
    </Container>
  )
}

export default SearchBar