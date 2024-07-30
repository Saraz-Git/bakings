import { Container, Text, Spinner } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { Link as RouterLink } from "react-router-dom";
import PostList from "../components/PostList";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_TAG } from "../utils/queries";

const ListPage = () => {
  const { loading, data } = useQuery(QUERY_TAG, {
    variables: { tagId: useParams().tagId },
  });
  const tag = data?.tag || {};

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        size="xl"
        m={12}
      />
    );
  }

  return (
    <Container py={6}>
      <Text fontSize={"lg"}>Results under {tag.tagText} :</Text>

      {tag.posts && <PostList posts={tag.posts} />}
    </Container>
  );
};

export default ListPage;
