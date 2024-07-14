import {Divider, Flex, Text,Link, useColorMode} from '@chakra-ui/react';
import { BsStarFill,BsPersonFill,BsMoonFill} from "react-icons/bs";
import { RiLoginBoxLine, RiLogoutBoxRLine} from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

import Auth from '../utils/auth.js';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <Flex w='100%'  h='60px' p='4' justifyContent={'space-between'}>
      <Link fontWeight={'bold'} style={{ textDecoration: 'none' }} as={RouterLink} to='/'>Bakings</Link>
      <Flex gap={'4'}>
        {Auth.loggedIn() ? (
          <>
            <BsStarFill className='zoom' size={24}/>
            <Link as={RouterLink} to={"/me"} ><BsPersonFill className='zoom' size={24} /> </Link>
            <RiLogoutBoxRLine className='zoom' size={24} onClick={logout}/>
          </>

        ):(
          <Link as={RouterLink} to={"/login"} >
          <RiLoginBoxLine className='zoom' size={24}/>
         </Link>
        )}
        
        <BsMoonFill className='zoom' onClick={toggleColorMode} size={22}/>
        
        
      </Flex>

    </Flex>
    <Divider/>
    </>
  )
}

export default Header