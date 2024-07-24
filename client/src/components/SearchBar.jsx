import {
  Container,
  Spinner,
  Input,
  Grid,
  Card,
  Center,
  Button,
  LinkBox,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_TAGS, QUERY_KEYWORDPOSTS } from "../utils/queries";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("%$#@");
  // const [search, { data }] = useLazyQuery(QUERY_KEYWORDPOSTS);

  const handleInputChange = (event) => {
    setIsMenuOpen(true);
    setKeyword(event.target.value);
    // search({
    //   variables: { word: event.target.value },
    // });
  };

  const { loading, data } = useQuery(QUERY_KEYWORDPOSTS, {
    variables: { word: keyword },
  });
  let results = data?.keywordPosts || [];
  if (results.length > 10) {
    results = results.slice(0, 10);
  }

  return (
    <Container p={0}>
      <Menu isOpen={isMenuOpen}>
        <InputGroup my={"4"}>
          <InputLeftElement>
            <MenuButton
              as={Button}
              variant="ghost"
              _hover={{ bg: "none" }}
              _active={{ bg: "none" }}
              rightIcon={<SearchIcon color="gray.300" />}
            ></MenuButton>
          </InputLeftElement>
          <Input
            focusBorderColor="orange.400"
            type="search"
            placeholder="Search"
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") console.log(e.target.value);
            }}
          />
        </InputGroup>

        {keyword && (
          <MenuList>
            {results &&
              results.map((result) => (
                <MenuItem
                  minW={"570px"}
                  as={RouterLink}
                  to={`/posts/${result._id}`}
                  key={result._id}
                >
                  {result.title}
                </MenuItem>
              ))}
          </MenuList>
        )}
      </Menu>
    </Container>
  );
};

export default SearchBar;
