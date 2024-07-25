import {
  Divider,
  Flex,
  Text,
  Link,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { BsStarFill, BsPersonFill, BsMoonFill } from "react-icons/bs";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { RxCookie } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";

import Auth from "../utils/auth.js";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex w="100%" h="60px" p="4" justifyContent={"space-between"}>
        <Link
          fontWeight={"bold"}
          style={{ textDecoration: "none" }}
          as={RouterLink}
          to="/"
        >
          <Flex gap={1}>
            Bakings <RxCookie size={22} />
          </Flex>
        </Link>

        <Flex gap={"4"}>
          {Auth.loggedIn() ? (
            <>
              <Tooltip
                hasArrow
                placement="top"
                label="See Collection"
                bg="gray.200"
                color="gray.600"
              >
                <Link as={RouterLink} to={"/me/collection"}>
                  <BsStarFill className="zoom" size={24} />
                </Link>
              </Tooltip>
              <Tooltip
                hasArrow
                placement="top"
                label="My Profile"
                bg="gray.200"
                color="gray.600"
              >
                <Link as={RouterLink} to={"/me"}>
                  <BsPersonFill className="zoom" size={24} />{" "}
                </Link>
              </Tooltip>
              <RiLogoutBoxRLine className="zoom" size={24} onClick={logout} />
            </>
          ) : (
            <Link as={RouterLink} to={"/login"}>
              <RiLoginBoxLine className="zoom" size={24} />
            </Link>
          )}

          <BsMoonFill className="zoom" onClick={toggleColorMode} size={22} />
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
