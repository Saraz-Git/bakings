import {
  Container,
  Spinner,
  Center,
  Button,
  LinkBox,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { QUERY_TAGS, QUERY_KEYWORDPOSTS } from "../utils/queries";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  let initialExpandMode = localStorage.getItem("expandMode") || false;
  if (initialExpandMode !== null) {
    if (initialExpandMode === "true") {
      initialExpandMode = true;
    } else {
      initialExpandMode = false;
    }
  } else {
    initialExpandMode = false;
  }

  const [isExpand, setIsExpand] = useState(initialExpandMode);

  useEffect(() => {
    localStorage.setItem("expandMode", isExpand), [isExpand];
  });

  const { loading, data } = useQuery(QUERY_TAGS);
  const tags = data?.tags || [];

  return (
    <Container pb={12}>
      <SearchBar />

      <SimpleGrid columns={[2, null, 3]} gap={6}>
        {isExpand == false &&
          tags.length <= 6 &&
          tags.map((tag) => (
            <LinkBox key={tag._id} as={RouterLink} to={`/tags/${tag._id}`}>
              <Center
                w="100%"
                h="40"
                fontSize="xl"
                textTransform="uppercase"
                color="red.200"
                bg={useColorModeValue("red.100", "gray.800")}
              >
                {tag.tagText}
              </Center>
            </LinkBox>
          ))}

        {isExpand == false &&
          tags.length > 6 &&
          tags.slice(0, 6).map((tag) => (
            <LinkBox key={tag._id} as={RouterLink} to={`/tags/${tag._id}`}>
              <Center
                w="100%"
                h="40"
                fontSize="xl"
                textTransform="uppercase"
                color="red.200"
                bg={useColorModeValue("red.100", "gray.800")}
              >
                {tag.tagText}
              </Center>
            </LinkBox>
          ))}

        {isExpand &&
          tags &&
          tags.map((tag) => (
            <LinkBox key={tag._id} as={RouterLink} to={`/tags/${tag._id}`}>
              <Center
                w="100%"
                h="40"
                fontSize="xl"
                textTransform="uppercase"
                color="red.200"
                bg={useColorModeValue("red.100", "gray.800")}
              >
                {tag.tagText}
              </Center>
            </LinkBox>
          ))}
      </SimpleGrid>

      <Button
        mt={"12"}
        w={"full"}
        mx={"auto"}
        bg={"orange.400"}
        color={"white"}
        onClick={() => setIsExpand(!isExpand)}
        _hover={{
          bg: "orange.500",
        }}
      >
        Expand
      </Button>
    </Container>
  );
};

export default HomePage;
