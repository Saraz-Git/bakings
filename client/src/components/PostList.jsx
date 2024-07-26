import {
  Card,
  CardBody,
  Heading,
  Badge,
  Text,
  Link,
  Stack,
  Image,
  CardFooter,
  AspectRatio,
  Box,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const PostList = ({ posts }) => {
  if (!posts) {
    return <Box>No posts yet</Box>;
  }

  return (
    <Box>
      {posts &&
        posts.map((post) => (
          <Flex
            as={RouterLink}
            to={`/posts/${post._id}`}
            my={6}
            border="1px"
            borderColor="gray.200"
            borderRadius={"6px"}
            bg={useColorModeValue("white", "gray.700")}
            shadow="md"
            key={post._id}
            w={"full"}
            minW={"250px"}
            direction={{ base: "column", sm: "row" }}
          >
            <Image
              borderTopLeftRadius="5px"
              borderBottomLeftRadius={{ base: "0", sm: "5px" }}
              borderTopRightRadius={{ base: "5px", sm: "0" }}
              className="cardImg"
              w="600px"
              objectFit="cover"
              maxW={{ base: "100%", sm: "250px" }}
              src={post.coverUrl}
              fallbackSrc="https://via.placeholder.com/250"
              alt={post.title}
            />
            <Flex
              minW={"250px"}
              direction="column"
              justifyContent={"space-between"}
              px={{ base: 4, sm: 6 }}
              py={{ base: 2, sm: 6 }}
            >
              <Box>
                <Heading size={{ base: "sm", sm: "md" }}>{post.title}</Heading>

                <Flex pt={2}>
                  {post.likedBy.length > 0 && (
                    <Badge mx={1} colorScheme="pink">
                      {post.likedBy.length} likes
                    </Badge>
                  )}

                  {post.collectedBy.length > 0 && (
                    <Badge mx={1} colorScheme="purple">
                      {post.collectedBy.length} collects
                    </Badge>
                  )}
                </Flex>
              </Box>

              <Text fontSize={"xs"} py="2">
                {post.createdAt}
              </Text>
            </Flex>
          </Flex>
          //   <Link
          //     key={post._id}
          //     w={"full"}
          //     href={`/posts/${post._id}`}
          //     style={{ textDecoration: "none" }}
          //   >
          //     <Card
          //       // direction={{ base: "column", md: "row" }}
          //       overflow="hidden"
          //       variant="outline"
          //       shadow={"md"}
          //       w={"full"}
          //       h="250px"
          //       my={6}
          //     >
          //       <Image
          //         className="cardImg"
          //         w="600px"
          //         objectFit="cover"
          //         //  maxW={{ base: '100%', sm: '250px' }}
          //         src={post.coverUrl}
          //         fallbackSrc="https://via.placeholder.com/250"
          //         alt={post.title}
          //       />

          //       <Stack>
          //         <CardBody>
          //           <Heading size={{ base: "sm", sm: "md" }}>
          //             {post.title}
          //           </Heading>

          //           <Badge colorScheme="pink">1 Likes</Badge>

          //           {/* {post.collectedBy.length>0  &&
          //   <Badge mx={1}colorScheme='purple'>
          //   {post.collectedBy.length} collects
          //   </Badge>
          //  } */}
          //         </CardBody>

          //         <CardFooter>
          //           <Text fontSize={"xs"} py="2">
          //             {post.createdAt}
          //           </Text>
          //         </CardFooter>
          //       </Stack>
          //     </Card>
          //   </Link>
        ))}
    </Box>
  );
};

export default PostList;
